import {atom, selector} from "recoil";
import {ApiContact, ApiMypageProjectApplicationToAdd} from '../openapi'

const contactState = atom<ApiContact>({
    key: 'contactState',
    default: {
        contactType: '',
        name: '',
        email: '',
        tel: '',
        body: '',
    }
})

const contactStatsState = selector({
    key: 'contactStatsState',
    get: ({get}) => {
        return get(contactState);
    }
})

const projectAppState = atom<ApiMypageProjectApplicationToAdd>({
    key: 'projectAppState',
    default: {
        projectId: undefined,
        contractorId: undefined,
        contractorPrice: undefined,
        immediateReceivingFlag: undefined,
        negotiationFlag: undefined,
        questionFlag: undefined,
        contractorComment: undefined
    }
})

const projectAppStatsState = selector({
    key: 'projectAppStatsState',
    get: ({get}) => {
        return get(projectAppState);
    }
})


export {
    contactState, contactStatsState,
    projectAppState, projectAppStatsState,
}