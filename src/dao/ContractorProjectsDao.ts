import {CONFIGURATION} from "../util/api";
import {ApiContractorProjectChangePrice, ApiContractorProjectProposal, ContractorProjectsApi} from "../openapi";
import CONFIG from "../const/DaoConfig";

export interface CompleteProjectApplication {
    projectApplicationId: number
    confirmationCode: string
}

const ContractorProjectDao = () => {
    const client = new ContractorProjectsApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const getAll = async () => {
        const result = await client.getAllContractorProjects('createdAt', 'DESC', CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end, option)
        return result.data.data;
    };

    const getProjectById = async (id: number) => {
        const result = await client.getContractorProjectById(id, option)
        return result.data
    }

    const complete = async (data: CompleteProjectApplication) => {
        const result = await client.completeProjectApplication(data, option)
        return result
    }

    const changePrice = async (data: ApiContractorProjectChangePrice) => {
        const result = await client.changePriceContractorProjectApplication(data, option)
        return result.data
    }

    const proposal = async (projectApplicationId: ApiContractorProjectProposal) => {
        const result = await client.proposalContractorProjectApplication(projectApplicationId, option)
        return result.data
    }

    return {
        getAll,
        getProjectById,
        complete,
        changePrice,
        proposal,
    }
}
export default ContractorProjectDao
