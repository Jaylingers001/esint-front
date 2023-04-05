import {atom, selector} from "recoil";

interface isLoggedIn {
    isLoggedIn: boolean,
    id: number | undefined,
}

const loggedInState = atom<isLoggedIn>({
    key: 'loggedInState',
    default: {
        isLoggedIn: false,
        id: 0,
    }
})

const loggedInStatsState = selector({
    key: 'loggedInStatsState',
    get: ({get}) => {
        return get(loggedInState);
    }
})

export {
    loggedInState, loggedInStatsState,
}