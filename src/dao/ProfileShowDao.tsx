import {AreasApi, ProfileShowApi} from "../openapi";
import {CONFIGURATION} from "../components/util/api";


const ProfileShowDao = () => {
    const client = new ProfileShowApi(CONFIGURATION);
    const clientArea = new AreasApi(CONFIGURATION);

    const getUserData = async (userId: number) => {
        return await client.getProfileById(userId);
    }

    const getArea = async () => {
        return await clientArea.getAllAreas();
    }

    return {
        getUserData,
        getArea
    }
}

export default ProfileShowDao;