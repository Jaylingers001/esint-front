import {useEffect, useState} from "react";
import {ApiProjectSearch, ApiUserFavoriteProjectToAdd} from '../openapi'
import FavoriteDao from "../dao/FavoriteDao";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {loggedInState} from "../recoilStates/isLoggedInRecoil";

interface Favorite {
    activeHeart: boolean
    areaName: string
    createdAt: Date
    id: number
    matchingPoint: number
    maxPrice: number
    minPrice: number
    projectName: string
    recruitingEndDate: Date
    recruitingStartDate: Date
    userProfileImageUrl: string
    workStartDate: Date
}

const useFavorite = () => {
    const router = useRouter()
    const {id} = router.query;
    const trueId = Number(id)
    const [favorite, setFavorite] = useState<ApiProjectSearch>()
    const [loggedIn] = useRecoilState(loggedInState)

    const checkHeart = () => {
        (async () => {
            if (loggedIn.isLoggedIn) {
                const favoriteData = await FavoriteDao().getAllMypageFavorites().catch((error) => {
                    console.log(error)
                })
                if (favoriteData) {
                    const data = favoriteData!.filter((item) => item.id === trueId)[0];
                    setFavorite(data)
                }
            }
        })();
    }

    const addToFavorites = async () => {
        if (!loggedIn.isLoggedIn) {
            await router.push({pathname: '/login'});
            return;
        }
        const data: ApiUserFavoriteProjectToAdd = {
            projectId: trueId,
            userId: 0
        }
        if (favorite) {
            await FavoriteDao().deleteMypageFavorite(data)
            setFavorite(undefined)
        } else {
            await FavoriteDao().addFavoriteProject(data);
            const favoriteData = await FavoriteDao().getAllMypageFavorites().catch((error) => {
                console.log(error)
            })
            setFavorite(favoriteData!.filter((item) => item.id === trueId)[0])

        }
        checkHeart();
    }

    useEffect(checkHeart, [loggedIn.isLoggedIn]);

    return {
        addToFavorites,
        favorite
    }
}

export default useFavorite;