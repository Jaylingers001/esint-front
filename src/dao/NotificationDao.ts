import {MypageNotificationsApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {CONFIGURATION} from "../components/util/api";

const NotificationDao = () => {
    const client = new MypageNotificationsApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const getAll = async () => {
        const result = await client.getAllMypageNotifications(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end, option)
        return result.data
    }

    const getAllNotLogin = async () => {
        const result = await client.getAllMypageNotificationsForNotLogInUser(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.order, CONFIG().CONFIG_DATA.start, CONFIG().CONFIG_DATA.end)
        return result.data
    }

    return {
        getAll,
        getAllNotLogin
    }
}

export default NotificationDao;