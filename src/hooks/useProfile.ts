import {useState} from "react";
import {ApiAreaTree, ApiUserProfile} from "../openapi";
import ProfileShowDao from "../dao/ProfileShowDao";
import {useRouter} from "next/router";
import {NEGATIVE_NUMBER_ONE} from "../const/constants";

const useProfile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<ApiUserProfile[]>();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const [areaName, setAreaName] = useState<string | undefined>();
    const getUserDetailsById = (userId: number) => {
        (async () => {
            if (userId) {
                try {
                    const result = await ProfileShowDao().getUserData(userId);
                    let areaName = areaList?.find(item => item.id === result.data.areaId);
                    setAreaName(areaName?.name);
                    setUserData([result.data]);
                } catch (e) {
                    router.push({pathname: '/error'}).then();
                }
            }
        })();
    }

    const getAreaList = () => {
        ProfileShowDao().getArea().then((data) => {
            setAreaList(data.data.data);
        }).catch((errors) => {
            alert(errors)
        });
    }

    const backToPrevPage = () => {
        // @ts-ignore
        window.history.back(NEGATIVE_NUMBER_ONE);
        return false;
    }

    return {
        getUserDetailsById,
        getAreaList,
        backToPrevPage,
        userData,
        areaName,
        areaList,
    }
}

export default useProfile;