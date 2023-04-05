import {ApiMypageThreadShowToAdd, ApiUserToSearch, MypageThreadsApi, MypageThreadShowApi, UsersApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {CONFIGURATION} from "../components/util/api";
import {messageProps} from "../components/pages/mypage/threads/showContainer";

const ThreadDao = () => {
    const threads = new MypageThreadsApi(CONFIGURATION);
    const showThreads = new MypageThreadShowApi(CONFIGURATION)

    const getAll = async () => {
        const option = CONFIG().CONFIG_HEADER();
        const result = await threads.getAllMypageThreads(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end, option)
        return result.data.data
    }

    const show = async (id: number) => {
        const option = CONFIG().CONFIG_HEADER();
        const result = await showThreads.getAllMypageThreadShow(id,CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end, option)
        return result.data.data
    }

    const addMessage = async (message: messageProps) => {
        const option = CONFIG().CONFIG_HEADER();
        const dataMessage : ApiMypageThreadShowToAdd = {
            message: message.body,
            status: 0,
        }
        const data = await showThreads.addMypageThreadShow(message.projectId,dataMessage, option)
    }


    return {
        getAll,
        show,
        addMessage,
    }
}

export default ThreadDao;