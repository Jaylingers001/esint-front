import {ApiUser, ApiUserSingle, MypageUsersApi, UsersApi} from "../openapi";
import {CONFIGURATION} from "../util/api";
import CONFIG from "../const/DaoConfig";

const UserDao = () => {
    const client = new MypageUsersApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const getUser = async () => {
        const data =  await client.getMypageUser(option).catch((e)=> {
            return null
        })
        return data
    }

    return {
        getUser
    }
}

export default UserDao