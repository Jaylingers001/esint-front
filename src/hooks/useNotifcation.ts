import {useEffect, useState} from "react";
import {ApiMypageNotifications, ApiMypageNotification} from '../openapi'
import {useRouter} from "next/router";
import moment from "moment";
import NotificationDao from "../dao/NotificationDao";
import {useRecoilState} from "recoil";
import {notificationBellState} from "../recoilStates/singleRecoil";

const useNotification = () => {
    const router = useRouter();
    const [bellState, setBellState] = useRecoilState(notificationBellState)
    const [notifications, setNotifications] = useState<ApiMypageNotification[]>();
    const [checkDate, setCheckDate] = useState<ApiMypageNotifications>()

    const isNotificationNew = (dates: string) => {
        return moment(dates).isAfter(checkDate?.userNotificationCheckDate, 'day')
    }

    const clickBellIcon = () => {
        setBellState({active: !bellState.active})
    }

    const checkNotification = () => {
        (async () => {
            const data = await NotificationDao().getAll();
            setNotifications(data.data)
            setCheckDate(data)
        })();
    }

    useEffect(checkNotification, [bellState]);

    return {
        clickBellIcon,
        notifications,
        isNotificationNew,
        router,
    }
}

export default useNotification;