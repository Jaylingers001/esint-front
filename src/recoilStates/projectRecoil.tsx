import {atom, selector} from "recoil";

interface minimumApplication {
    id: number | undefined,
    status: number | undefined,
    projectId: number | undefined,
    contractorId: number | undefined,
    definitePrice: number | undefined,
    cancelPrice: number | undefined,
    messageStatus: number | undefined,
    ordererPrice: number | undefined,
    createdAt: string | undefined,
    updatedAt: string | undefined,
    confirmationCode: string | undefined,
}

const projectApplicationState = atom<minimumApplication>({
    key: 'projectApplicationState',
    default: {
        id: undefined,
        status: undefined,
        projectId: undefined,
        contractorId: undefined,
        definitePrice: undefined,
        cancelPrice: undefined,
        messageStatus: undefined,
        ordererPrice: undefined,
        updatedAt: undefined,
        createdAt: undefined,
        confirmationCode: undefined,
    }
})

const projectApplicationStatsState = selector({
    key: 'projectApplicationStatsState',
    get: ({get}) => {
        return get(projectApplicationState);
    }
})

export {
    projectApplicationState, projectApplicationStatsState,
}