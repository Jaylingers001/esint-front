import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
    ApiContractorProject, ApiContractorProjectChangePrice, ApiContractorProjectProposal,
    ApiContractorProjectShow,
    ApiProjectSearch,
    ApiUserFavoriteProjectToAdd
} from "../openapi";
import moment from "moment";
import ContractorProjectDao, {CompleteProjectApplication} from "../dao/ContractorProjectsDao";
import FavoriteDao from "../dao/FavoriteDao";
import {NEGATIVE_NUMBER_ONE, PROJECT_APPLICATION_STATUS, PROJECT_APPLICATIONS_STATUS_LABEL} from "../const/constants";
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../config/firebaseInitializer";

interface InputForm {
    input1: number
    input2: number
    input3: number
    input4: number
    submit: boolean
    indicator: string
    contractorPrice: number
}

const useContractor = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id)

    const [contractorProjectApplications, setContractorProjectApplications] = useState<ApiContractorProjectShow>();
    const [hashtags, setHashtags] = useState([''])
    const [favorite, setFavorite] = useState<ApiProjectSearch>()
    const [comment, setComment] = useState<string>()
    const [projects, setProjects] = useState<ApiContractorProject[]>()
    const [isContractor, setIsContractor] = useState(true)
    const [showDownload, setShowDownload] = useState(false)
    const [originalFilenameList, setOriginalFilenameList] = useState<[]>();
    const [upLoadFileNumber, setUpLoadFileNumber] = useState([{
        id: 1, noData: 'false', name: '', fileSize: '', htmlFile: ''
    },
        {id: 2, noData: 'false', name: '', fileSize: '', htmlFile: ''},
        {id: 3, noData: 'false', name: '', fileSize: '', htmlFile: ''}])

    const checkRelatedProjectApplications = () => {
        (async () => {
            if (router.isReady && router.pathname !== '/mypage/contractorProjects') {
                const projectApplications = await ContractorProjectDao().getProjectById(trueId).catch(error => {
                    if (JSON.stringify(error).includes('500')) {
                        router.push('/error')
                    }
                })
                if (projectApplications) {
                    switch (projectApplications.projectApplication?.status) {
                        case PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR:
                            projectApplications.displayPrice = projectApplications.projectApplication?.contractorPrice
                            break
                        case PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER:
                            projectApplications.displayPrice = projectApplications.projectApplication?.ordererPrice
                            break
                        case PROJECT_APPLICATION_STATUS.CANCELLED:
                            projectApplications.displayPrice = projectApplications.projectApplication?.cancelPrice
                            break
                        default:
                            projectApplications.displayPrice = projectApplications.projectApplication?.definitePrice
                    }

                    // @ts-ignore
                    let arrOriginalFilename = []
                    projectApplications.projectFile?.map(async (data) => {
                        // @ts-ignore
                        arrOriginalFilename.push(data.originalFilename + 'num' + data.fileIndex)

                        // @ts-ignore
                        const path = '/myPage/ordererProjects/' + projectApplications.projectId + '_' + data.fileIndex + '.' + data.originalFilename.split('.').pop();
                        getDownloadURL(ref(firebaseStorage, path))
                            .then(async (url) => {
                                    upLoadFileNumber[(Number(data.fileIndex) - 1)].htmlFile = url;
                                }
                            )
                            .catch((e: any) => alert(e));

                        if (data.originalFilename != null) {
                            upLoadFileNumber[(Number(data.fileIndex) - 1)].noData = 'true';
                            if (data.fileSize != null) {
                                upLoadFileNumber[(Number(data.fileIndex) - 1)].fileSize = String(data.fileSize);
                            }
                            upLoadFileNumber[(Number(data.fileIndex) - 1)].name = data.originalFilename;
                            await setUpLoadFileNumber(upLoadFileNumber);
                        }
                    })
                    setShowDownload(true);
                    // @ts-ignore
                    setOriginalFilenameList(arrOriginalFilename)

                    setContractorProjectApplications(projectApplications)
                    await checkFavorites()
                }

            }
        })();
    }

    const downloadFile = (isEdiPage: boolean, htmlFile: any, name: string, id: number) => {
        if (isEdiPage) {
            if (originalFilenameList) {
                let objIndex = originalFilenameList.findIndex((obj => obj == name + 'num' + id));
                if (objIndex === NEGATIVE_NUMBER_ONE) {
                    // @ts-ignore
                    $('a').attr("href", window.URL.createObjectURL(htmlFile));
                } else {
                    // @ts-ignore
                    $('a').attr("href", htmlFile);
                }
            }
        } else {
            // @ts-ignore
            $('a').attr("href", window.URL.createObjectURL(htmlFile));
        }
        // @ts-ignore
        $('a').attr("download", name);
    }

    const kbToMb = (kb: string | number) => {
        const mb = bytesToSize(kb)
        return mb;
    }

    function bytesToSize(bytes: string | number) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        if (typeof bytes === "number") {
            const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
            // @ts-ignore
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }
    }

    const filterHashTags = () => {
        (async () => {
            const comment = contractorProjectApplications?.projectApplication?.contractorComment
            if (!comment) {
                return '';
            }
            const data = new Array<string>();
            const result = comment.match(/(\s#\S+)/ig)
            result?.map(item => {
                data.push(item)
            })
            setHashtags(data)
            setComment(comment)
        })();
    }

    const complete = async (data: InputForm) => {

        if (data.indicator === 'confirmCode') {
            const res: CompleteProjectApplication = {
                projectApplicationId: contractorProjectApplications?.projectApplication?.id!,
                confirmationCode: data.input1.toLocaleString() + data.input2.toLocaleString() + data.input3.toLocaleString() + data.input4.toLocaleString()
            }

            await ContractorProjectDao().complete(res).catch(error => {
                alert(error.response.data.message)
                return
            })

        }
        if (data.indicator === 'contractorPrice') {
            const res: ApiContractorProjectChangePrice = {
                projectApplicationId: contractorProjectApplications?.projectApplication?.id!,
                contractorPrice: data.contractorPrice
            }

            const result = await ContractorProjectDao().changePrice(res)
        }
        if (data.indicator === 'submitApi') {
            const res: ApiContractorProjectProposal = {
                projectApplicationId: contractorProjectApplications?.projectApplication?.id!
            }

            const result = await ContractorProjectDao().proposal(res)
        }

        checkRelatedProjectApplications();
    }

    const checkFavorites = () => {
        (async () => {
            const asd = await FavoriteDao().getAllMypageFavorites().catch((error) => {
                console.log(error)
            })
            if (asd) {
                const data = asd!.filter((item) => item.id === contractorProjectApplications?.projectId)[0];
                setFavorite(data)
            }
        })();
    }

    const addToFavorite = async (favorite: ApiProjectSearch) => {
        if (await favorite) {
            const data: ApiUserFavoriteProjectToAdd = {
                projectId: favorite.id,
                userId: 0
            }
            await FavoriteDao().deleteMypageFavorite(data).catch((error) => {
                console.log(error)
            })
        } else {
            const data: ApiUserFavoriteProjectToAdd = {
                projectId: contractorProjectApplications!.projectId!,
                userId: 0
            }
            await FavoriteDao().addFavoriteProject(data).catch((error) => {
                console.log(error)
            })
        }
        checkFavorites();
    }

    const checkDestiny = (data: ApiContractorProjectShow) => {
        return data?.projectApplication?.status === PROJECT_APPLICATION_STATUS.RESTRICTED && moment(data?.project?.workStartDate).locale('ja') <= moment(new Date()).locale('ja')
    }

    const formatDate = (date: string) => {
        const month = moment(date).format('MM')
        const day = moment(date).format('DD')
        return month + '月' + day + '日'
    }


    const changeWord = (contractorProjectApplications: ApiContractorProjectShow) => {
        if (contractorProjectApplications?.projectApplication?.status === PROJECT_APPLICATION_STATUS.RESTRICTED && moment(contractorProjectApplications.project?.workEndDate).isAfter(moment(Date.now()))) {
            return '仕事完了'
        }
        return '成約'
    }

    const stopJump = () => {
        (async () => {
            if (router.isReady) {
                const data = await ContractorProjectDao().getAll()
                await Promise.all(
                    data!!.map(async (item) => {
                        const asf = await ContractorProjectDao().getProjectById(item.projectApplicationId!)
                        switch (item.status) {
                            case PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR:
                                item.displayPrice = asf.projectApplication?.contractorPrice
                                break
                            case PROJECT_APPLICATION_STATUS.PROPOSING_ORDERER:
                                item.displayPrice = asf.projectApplication?.ordererPrice
                                break
                            case PROJECT_APPLICATION_STATUS.CANCELLED:
                                item.displayPrice = asf.projectApplication?.cancelPrice
                                break
                            default:
                                item.displayPrice = asf.projectApplication?.definitePrice
                        }

                        return item
                    }))
                setProjects(data)
            }
        })();
    }

    const recruitingDays = (startDate: string, endDate: string) => {
        const a = moment(startDate)
        const b = moment(endDate)
        return b.diff(a, 'days')
    }


    const projectStatus = (status: number) => {
        const asd = PROJECT_APPLICATIONS_STATUS_LABEL.filter((item) => item.value === status)
        return asd[0].label
    }

    const formatDateRestraint = (date: string | undefined) => {
        const month = moment(date).format('M')
        const day = moment(date).format('DD')
        const hour = moment(date).format('HH')
        const minutes = moment(date).format('mm')
        return month + '月' + day + '日' + hour + '時' + minutes + '分'
    }

    useEffect(stopJump, [router.isReady]);
    useEffect(filterHashTags, [trueId, contractorProjectApplications]);
    useEffect(checkFavorites, [router.isReady, contractorProjectApplications]);
    useEffect(checkRelatedProjectApplications, [trueId, router.isReady]);


    return {
        contractorProjectApplications,
        hashtags,
        complete,
        checkFavorites,
        favorite,
        addToFavorite,
        comment,
        checkDestiny,
        formatDate,
        changeWord,
        projects,
        recruitingDays,
        projectStatus,
        formatDateRestraint,
        isContractor,
        setIsContractor,
        router,
        upLoadFileNumber,
        showDownload,
        downloadFile,
        kbToMb
    }
}

export default useContractor;