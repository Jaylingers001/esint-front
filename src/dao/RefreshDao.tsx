import {ApiRefreshToken, RefreshTokenApi} from "../openapi";
import {CONFIGURATION} from "../util/api";


const RefreshDao = () => {

    const refreshTokenPost = async (data: ApiRefreshToken) => {
        const client = new RefreshTokenApi(CONFIGURATION)
        return await client.refreshTokenPost(data);
    }

    return {
        refreshTokenPost
    }
}

export default RefreshDao;