import {useEffect, useState} from "react";
import ProjectedDao from "../dao/ProjectedDao";
import {ApiArea, ApiProject} from "../openapi";
import {useRouter} from "next/router";
import {LINK_TO_URL, PROJECT_APPLICATION_STATUS, PROJECT_STATUS} from "../const/constants";
import moment from "moment";
import {useRecoilState} from "recoil";
import {loggedInState} from "../recoilStates/isLoggedInRecoil";
import {projectApplicationState} from "../recoilStates/projectRecoil";
import AreaDao from "../dao/AreaDao";
import ProjectApplicationsDao from "../dao/ProjectApplicationsDao";

const useProjected = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id)

    const [projects, setProjects] = useState<ApiProject>();
    const [hashtags, setHashtags] = useState([''])
    const [visibility, setVisibility] = useState(true);
    const [applicationSubmit, setApplicationSubmit] = useState(true);
    const [area, setArea] = useState<ApiArea>();
    const [comment, setComment] = useState('')
    const [loggedIn] = useRecoilState(loggedInState)
    const [projectApp, setProjectApp] = useRecoilState(projectApplicationState)
    const [isProjectApplication, setIsProjectApplication] = useState<boolean>(false)

    const checkProject = () => {
        (async () => {
            if (router.isReady) {
                const data = await ProjectedDao().getById(trueId)
                setProjects(data)
                const area = await AreaDao().getAreaById(data.areaId)
                setArea(area)
                if (loggedIn.isLoggedIn) {

                    const result = await ProjectApplicationsDao().getAllProjectApplications()

                    const data = result?.filter((data) =>
                        data.projectId === trueId &&
                        data.contractorId === loggedIn.id &&
                        (
                            data.status === PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR ||
                            data.status === PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER ||
                            data.status === PROJECT_APPLICATION_STATUS.RESTRICTED ||
                            data.status === PROJECT_APPLICATION_STATUS.WORK_COMPLETED ||
                            data.status === PROJECT_APPLICATION_STATUS.CHATTING
                        )
                    )
                    console.log(data)
                    if (data!.length > 0) {
                        if (data![0].status !== PROJECT_APPLICATION_STATUS.CHATTING) {
                            setIsProjectApplication(true)
                        }
                        setProjectApp({
                            id: data![0].id,
                            status: data![0].status,
                            projectId: data![0].projectId,
                            contractorId: data![0].contractorId,
                            definitePrice: data![0].definitePrice,
                            cancelPrice: data![0].cancelPrice,
                            messageStatus: data![0].messageStatus,
                            ordererPrice: data![0].ordererPrice,
                            createdAt: data![0].createdAt,
                            updatedAt: data![0].updatedAt,
                            confirmationCode: data![0].confirmationCode,
                        })
                    }
                }
            }
        })();
    }

    const filterHashTags = () => {
        (async () => {
            const comment = projects?.description
            if (!comment) {
                return '';
            }

            const space = comment.split(' ');
            const data = new Array<string>();
            let sentence = ''

            space.map((item) => {
                if (item[0] === '#') {
                    data.push(item)
                } else {
                    sentence += item + ' '
                }
            })
            setComment(sentence)
            setHashtags(data)
        })();
    }

    const hideButton = () => {
        (() => {
            if (router.isReady) {
                if (projects && projects?.status === PROJECT_STATUS.LOOKING &&
                    (moment(projects?.recruitingStartDate).locale('ja') <= moment(new Date()).locale('ja')) &&
                    (moment(new Date()).locale('ja')) <= moment(projects?.recruitingEndDate).locale('ja')) {
                    setVisibility(true)
                } else {
                    setVisibility(false)
                }
            }
        })();
    }


    const hideApplicationSubmit = () => {
        (async () => {
            if (router.isReady) {
                if (loggedIn.id === projects?.ordererId) {
                    setApplicationSubmit(false)
                } else {
                    setApplicationSubmit(true)
                }
            }
        })();
    }

    const formatDate = (date: string | undefined) => {
        const month = moment(date).format('M')
        const day = moment(date).format('DD')
        const hour = moment(date).format('HH')
        const minutes = moment(date).format('mm')
        return month + '月' + day + '日' + hour + '時' + minutes + '分'
    }

    const linkTo = async (from: string) => {
        if (!loggedIn.isLoggedIn) {
            await router.push({pathname: '/login'})
            return;
        }

        if (applicationSubmit && from === LINK_TO_URL.THREADS) {
            const projectApplicationId = await checkProjectApplication();
            await router.push({pathname: '/mypage/threads/show/' + projectApplicationId});
            return;
        }

        if (applicationSubmit && from === LINK_TO_URL.APPLICATIONS) {
            console.log(projectApp)
            if (projectApp.id === undefined || projectApp.status === PROJECT_APPLICATION_STATUS.CHATTING) {
                await router.push({pathname: '/projects/application/' + projects?.id})
                return
            }
            if (projectApp.status !== PROJECT_APPLICATION_STATUS.CHATTING) {
                await router.push({pathname: '/mypage/contractorProjects/show/' + projectApp.id})
                return;
            }
        }
        alert('自分の案件です。')
    }

    const checkProjectApplication = async () => {
        const data = await ProjectApplicationsDao().createThread(trueId);
        return data.projectApplicationId
    }

    useEffect(checkProject, [id, router.isReady, loggedIn.isLoggedIn]);
    useEffect(filterHashTags, [projects]);
    useEffect(hideButton, [projects, router.isReady]);
    useEffect(hideApplicationSubmit, [projects, loggedIn.isLoggedIn]);

    return {
        projects,
        hashtags,
        applicationSubmit,
        router,
        loggedIn,
        formatDate,
        area,
        comment,
        visibility,
        linkTo,
        isProjectApplication,
    }

}

export default useProjected;