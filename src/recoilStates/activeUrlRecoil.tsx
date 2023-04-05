import {atom, selector} from "recoil";

interface isActive {
    top?: boolean,
    create?: boolean,
    search?: boolean,
    threads?: boolean,
    mypage?: boolean,
}

const activeUrlState = atom<isActive>({
    key: 'activeUrlState',
    default: {
        top: false,
        create: false,
        search: false,
        threads: false,
        mypage: false,
    }
})

const activeUrlStatsState = selector({
    key: 'activeUrlStatsState',
    get: ({get}) => {
        return get(activeUrlState);
    }
})

export {
    activeUrlState, activeUrlStatsState,
}