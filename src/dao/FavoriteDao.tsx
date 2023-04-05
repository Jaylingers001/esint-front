import {ApiUserFavoriteProjectToAdd, MypageFavoritesApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {CONFIGURATION} from "../components/util/api";

const FavoriteDao = () => {
    const client = new MypageFavoritesApi(CONFIGURATION);

    const option = CONFIG().CONFIG_HEADER();

    const addFavoriteProject = async (data: ApiUserFavoriteProjectToAdd) => {
        return client.addMypageFavorite(data, option);
    }

    const getAllMypageFavorites = async () => {
        const result = await client.getAllMypageFavorites(
            CONFIG().CONFIG_DATA.sort,
            CONFIG().CONFIG_DATA.order,
            CONFIG().CONFIG_DATA.start,
            CONFIG().CONFIG_DATA.end,
            undefined,
            option);

        return result.data.data
    }

    const deleteMypageFavorite = async (data: ApiUserFavoriteProjectToAdd) => {
        return client.deleteMypageFavorite(data, option);
    }

    return {
        addFavoriteProject,
        getAllMypageFavorites,
        deleteMypageFavorite,
    }
}

export default FavoriteDao;