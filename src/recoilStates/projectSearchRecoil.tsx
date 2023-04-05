import {atom} from "recoil";
import {ApiProjectSearch, ApiProjectToSearch} from "../openapi";

const projectSearchState = atom<ApiProjectSearch[]>({
    key: 'projectSearchState',
    default: [],
})

const projectToSearchState = atom<ApiProjectToSearch[]>({
    key: 'projectToSearchState',
    default: [],
})

const reSearch = atom<boolean>({
    key: 'reSearch',
    default: false,
})

const totalResult = atom<number>({
    key: 'totalResult',
    default: 0,
})

const signUpPage = atom<boolean>({
    key: 'signUpPage',
    default: false,
})

const isPreviousPageIsCreatingProject = atom<boolean>({
    key: 'isPreviousPageIsCreatingProject',
    default: false,
})

export {
    projectSearchState, projectToSearchState, reSearch, totalResult, signUpPage, isPreviousPageIsCreatingProject
}
