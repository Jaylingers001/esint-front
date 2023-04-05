import {atom, selector} from "recoil";
import {ApiMypageNotification} from '../openapi'

const notificationState = atom<ApiMypageNotification>({
    key: 'notificationState',
    default: {
        title: '',
        body: '',
        createdAt: ''
    }
})

const notificationStatsState = selector({
    key: 'notificationStatsState',
    get: ({get}) => {
        return get(notificationState);
    }
})

const notificationBellState = atom({
    key: 'notificationBellState',
    default: {
        active: false,
    }
})

const notificationBellStatsState = selector({
    key: 'notificationBellStatsState',
    get: ({get}) => {
        return get(notificationBellState);
    }
})

export {
    notificationState, notificationStatsState,
    notificationBellState, notificationBellStatsState,
}