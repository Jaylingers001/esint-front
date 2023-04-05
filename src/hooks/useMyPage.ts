import {useState} from "react";
import {ApiProjectSearch, ApiRefreshToken} from "../openapi";
import MyPageDao from "../dao/MyPageDao";
import {useRouter} from "next/router";
import {DEFAULT_NUMBER_DISPLAY} from "../const/constants";
import CONFIG from "../const/DaoConfig";
import useLocalStorageLogin from "./useLocalStorageLogin";
import RefreshDao from "../dao/RefreshDao";

const useMyPage = () => {
    const [favorites, setFavorites] = useState<ApiProjectSearch[]>();
    const [top, setTop] = useState<ApiProjectSearch[]>();
    const [recommendations, setRecommendations] = useState<ApiProjectSearch[]>();
    const router = useRouter()
    const [addMoreTenData, setAddMoreTenData] = useState(DEFAULT_NUMBER_DISPLAY)

    const checkTop = () => {
        const tokens = useLocalStorageLogin().getLocalStorageLoginToken();
        (async () => {
            if (tokens !== null) {
                const result = await MyPageDao().getAllMyPageTopLogin(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreTenData).catch(async () => {
                    const loginResult = await MyPageDao().getAllMyPageTopNotLogin(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreTenData)
                    if (loginResult) {
                        useLocalStorageLogin().clearLocalStorageLogin();
                        setTop(loginResult.data);
                    }
                })
                if (result) {
                    const refreshToken = useLocalStorageLogin().getLocalStorageRefreshToken()

                    if (refreshToken !== null) {
                        const value: ApiRefreshToken = {
                            refreshToken: refreshToken
                        }

                        const refreshResult = await RefreshDao().refreshTokenPost(value)
                        const email = useLocalStorageLogin().getLocalStorageLoginUser()
                        useLocalStorageLogin().setLocalStorageLogin(refreshResult.data.accessToken, refreshResult.data.refreshToken, email!!);
                    }

                    setTop(result.data);
                }
            } else {
                const result = await MyPageDao().getAllMyPageTopNotLogin(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreTenData)
                if (result) {
                    setTop(result.data);
                }
            }
        })();
    }

    const checkFavorite = () => {
        (async () => {
            const result = await MyPageDao().getAllMyPageFavorites(addMoreTenData).catch(() => {
            })
            if (result) {
                setFavorites(result.data);
            }
        })();
    }

    const checkRecommendation = () => {
        (async () => {
            const result = await MyPageDao().getAllMyPageRecommendations(addMoreTenData).catch(() => {
            })
            if (result) {
                setRecommendations(result.data);
            }
        })();
    }

    const removedFavorites = async (id: number) => {
        const data = {userId: undefined, projectId: id}
        await MyPageDao().deleteMypageFavorite(data);
        checkFavorite();
    }

    const addFavorites = async (pageName: string, projectId: number, activeHeart: boolean) => {
        const tokens = useLocalStorageLogin().getLocalStorageLoginToken();
        if (tokens !== null) {
            if (activeHeart) {
                const data = {userId: undefined, projectId: projectId}
                await MyPageDao().deleteMypageFavorite(data);
            } else {
                const data = {projectId: projectId}
                await MyPageDao().addMypageFavorite(data);
            }
            if (pageName === 'top') {
                checkTop();
            } else {
                checkRecommendation();
            }
        } else {
            router.push({pathname: '/login'})
        }
    }

    const showMore = async (pageName: string) => {
        await (async () => {
            if (pageName === 'top') {
                const tokens = useLocalStorageLogin().getLocalStorageLoginToken();
                if (tokens !== null) {
                    if (addMoreTenData === top?.length) {
                        const result = await MyPageDao().getAllMyPageTopLogin(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreTenData + DEFAULT_NUMBER_DISPLAY)
                        if (result) {
                            setTop(result.data);
                            setAddMoreTenData((val) => val + DEFAULT_NUMBER_DISPLAY)
                        }
                    }
                } else {
                    if (addMoreTenData === top?.length) {
                        const result = await MyPageDao().getAllMyPageTopNotLogin(CONFIG().CONFIG_DATA.sort, CONFIG().CONFIG_DATA.orderByDesc, addMoreTenData + DEFAULT_NUMBER_DISPLAY);
                        if (result) {
                            setTop(result.data);
                            setAddMoreTenData((val) => val + DEFAULT_NUMBER_DISPLAY)
                        }
                    }
                }
            } else if (pageName === 'favorite') {
                if (addMoreTenData === favorites?.length) {
                    const result = await MyPageDao().getAllMyPageFavorites(addMoreTenData + DEFAULT_NUMBER_DISPLAY);
                    if (result) {
                        setFavorites(result.data);
                        setAddMoreTenData((val) => val + DEFAULT_NUMBER_DISPLAY)
                    }
                }
            } else if (pageName === 'recommendations') {
                if (addMoreTenData === recommendations?.length) {
                    const result = await MyPageDao().getAllMyPageRecommendations(addMoreTenData + DEFAULT_NUMBER_DISPLAY);
                    if (result) {
                        setRecommendations(result.data);
                        setAddMoreTenData((val) => val + DEFAULT_NUMBER_DISPLAY)
                    }
                }
            }
        })();
    }

    const hideTutorialModal = () =>  {
        useLocalStorageLogin().setLocalStorageDisplayTutorialForIndexPage('false')
    }

    return {
        removedFavorites,
        addFavorites,
        checkTop,
        checkFavorite,
        checkRecommendation,
        showMore,
        hideTutorialModal,
        top,
        favorites,
        recommendations,
        addMoreTenData
    }
}

export default useMyPage;

