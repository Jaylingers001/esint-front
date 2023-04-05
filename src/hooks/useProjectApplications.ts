import {useRouter} from "next/router";
import ProjectApplicationsDao from "../dao/ProjectApplicationsDao";
import {useRecoilValue} from "recoil";
import {projectApplicationStatsState} from "../recoilStates/projectRecoil";
import {PROJECT_APPLICATION_STATUS} from "../const/constants";
import {useState} from "react";


interface projectApplication {
    contractorComment: string
    contractorPrice: number
    immediateReceivingFlag: boolean
    negotiationFlag: boolean
    questionFlag: boolean
    status?: number
    projectId?: number
    contractorId?: number
    definitePrice?: number
    cancelPrice?: number
    messageStatus?: number
    ordererPrice?: number
    createdAt?: string
    updatedAt?: string
    confirmationCode?: string
}

const useProjectApplications = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id)
    const projectApp = useRecoilValue(projectApplicationStatsState);
    const [errorContactorPrice, setErrorContactorPrice] = useState(false)

    const handleSave = async (data: projectApplication) => {
        const saveData: projectApplication = {
            contractorComment: data.contractorComment ? data.contractorComment : '',
            contractorPrice: Number(data.contractorPrice),
            immediateReceivingFlag: data.immediateReceivingFlag ? data.immediateReceivingFlag : false,
            negotiationFlag: data.negotiationFlag ? data.negotiationFlag : false,
            questionFlag: data.questionFlag ? data.questionFlag : false
        }

        if (projectApp.id === undefined) {
            const application = await ProjectApplicationsDao().createProjectApplication(trueId, saveData);
            await router.push({pathname: '/mypage/contractorProjects/show/' + application.id})
        }
        if (projectApp.id) {
            saveData.status = PROJECT_APPLICATION_STATUS.PROPOSING_CONTRACTOR
            saveData.projectId = projectApp.projectId
            saveData.contractorId = projectApp.contractorId
            saveData.definitePrice = projectApp.definitePrice
            saveData.cancelPrice = projectApp.cancelPrice
            saveData.messageStatus = projectApp.messageStatus
            saveData.ordererPrice = projectApp.ordererPrice
            saveData.createdAt = projectApp.createdAt
            saveData.updatedAt = projectApp.updatedAt
            saveData.confirmationCode = projectApp.confirmationCode

            // @ts-ignore
            await ProjectApplicationsDao().updateProjectApplication(projectApp.id, saveData)
            await router.push({pathname: '/mypage/contractorProjects/show/' + projectApp.id})
        }
    }

    const applicationSubmitEvent = () => {
        const contractorPrice = document.getElementById('contractorPrice');
        // @ts-ignore
        if (contractorPrice.value !== '' && Number(contractorPrice.value) >= 0) {
            setErrorContactorPrice(false)
            // @ts-ignore
            $('.js-modal').fadeIn();
        } else {
            setErrorContactorPrice(true)
        }
    }

    return {
        handleSave,
        applicationSubmitEvent,
        errorContactorPrice
    }
}

export default useProjectApplications;