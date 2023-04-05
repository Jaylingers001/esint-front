import {atom, selector} from "recoil";
import {ApiSignupInputToAdd} from '../openapi'


const signupState = atom<ApiSignupInputToAdd>({
    key: 'signupState',
    default: {
        email: '',
        name: '',
        postalCode1: '',
        postalCode2: '',
        areaId: 0,
        address1: '',
        address2: '',
        experienceYears: 0,
        selfIntroduction: "",
        password: '',
        // @ts-ignore
        passwordVerification: ''
    }
})

const signupStatsState = selector({
    key: 'signupStatsState',
    get: ({get}) => {
        return get(signupState);
    }
})

export {signupState, signupStatsState}