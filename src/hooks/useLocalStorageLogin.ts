import LocalStoredNames from "../const/LocalStorage";

const useLocalStorageLogin = () => {

    const setLocalStorageLogin = (accessToken: string | undefined, refreshToken: string | undefined, username: string) => {
        if (typeof accessToken === "string") {
            localStorage.setItem(LocalStoredNames.LOGINACCESS, accessToken);
        }
        if (typeof refreshToken === "string") {
            localStorage.setItem(LocalStoredNames.LOGINREFRESH, refreshToken);
        }

        localStorage.setItem(LocalStoredNames.LOGINUSER, username);

    }

    const setLocalStorageSignUp = (signUp: any) => {
        localStorage.setItem(LocalStoredNames.SIGNUP, signUp);
    }

    const setLocalStorageSignUpTel = (signUpTel: string) => {
        localStorage.setItem(LocalStoredNames.SIGNUPTEL, signUpTel);
    }

    const setLocalStorageProjectsSearch = (data: any) => {
        if (typeof data === "string") {
            localStorage.setItem(LocalStoredNames.PROJECTSEARCH, data);
        }
    }

    const setLocalStorageInputDataProjectSearch = (data: any) => {
        if (typeof data === "string") {
            localStorage.setItem(LocalStoredNames.INPUTDATA, data);
        }
    }

    const setLocalStorageDisplayTutorialForIndexPage = (displayTutorial: string) => {
        localStorage.setItem(LocalStoredNames.DISPLAYTUTORIALFORINDEXPAGE, displayTutorial);
    }

    const setLocalStorageDisplayTutorialForSearchPage = (displayTutorial: string) => {
        localStorage.setItem(LocalStoredNames.DISPLAYTUTORIALFORSEARCHPAGE, displayTutorial);
    }

    const setLocalStorageDisplayTutorialForCreatePage = (displayTutorial: string) => {
        localStorage.setItem(LocalStoredNames.DISPLAYTUTORIALFORCREATEPAGE, displayTutorial);
    }

    const getLocalStorageDisplayTutorialForIndexPage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(LocalStoredNames.DISPLAYTUTORIALFORINDEXPAGE);
        }
    }

    const getLocalStorageDisplayTutorialForSearchPage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(LocalStoredNames.DISPLAYTUTORIALFORSEARCHPAGE);
        }
    }

    const getLocalStorageDisplayTutorialForCreatePage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(LocalStoredNames.DISPLAYTUTORIALFORCREATEPAGE);
        }
    }

    const getLocalStorageSignUp = () => {
        return localStorage.getItem(LocalStoredNames.SIGNUP);
    }

    const getLocalStorageSignUpTel = () => {
        return localStorage.getItem(LocalStoredNames.SIGNUPTEL);
    }

    const getLocalStorageInputDataProjectSearch = () => {
        return localStorage.getItem(LocalStoredNames.INPUTDATA);
    }

    const getLocalStorageProjectsSearch = () => {
        return localStorage.getItem(LocalStoredNames.PROJECTSEARCH);
    }

    const getLocalStorageLoginUser = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(LocalStoredNames.LOGINUSER);
        }
    }

    const removedLocalStorageProjectsSearch = () => {
        localStorage.removeItem(LocalStoredNames.PROJECTSEARCH);
    }

    const getLocalStorageLoginToken = () => {
        return localStorage.getItem(LocalStoredNames.LOGINACCESS);
    }

    const getLocalStorageRefreshToken = () => {
        return localStorage.getItem(LocalStoredNames.LOGINREFRESH);
    }


    const clearLocalStorageLogin = () => {
        localStorage.removeItem(LocalStoredNames.LOGINACCESS);
        localStorage.removeItem(LocalStoredNames.LOGINREFRESH);
        localStorage.removeItem(LocalStoredNames.LOGINUSER);
        localStorage.removeItem(LocalStoredNames.CREATINGPROJECT);
    }

    const logout = () => {
        clearLocalStorageLogin();
    }

    const setLocalStorageCreatingProject = (val: boolean) => {
        localStorage.setItem(LocalStoredNames.CREATINGPROJECT, String(val));
    }

    const getLocalStorageCreatingProject = () => {
        return localStorage.getItem(LocalStoredNames.CREATINGPROJECT);
    }

    const clearCreatingProject = () => {
        localStorage.removeItem(LocalStoredNames.CREATINGPROJECT);
    }

    return {
        setLocalStorageLogin,
        setLocalStorageSignUp,
        setLocalStorageSignUpTel,
        setLocalStorageProjectsSearch,
        setLocalStorageInputDataProjectSearch,
        setLocalStorageCreatingProject,
        setLocalStorageDisplayTutorialForIndexPage,
        setLocalStorageDisplayTutorialForSearchPage,
        setLocalStorageDisplayTutorialForCreatePage,
        getLocalStorageSignUp,
        getLocalStorageSignUpTel,
        getLocalStorageCreatingProject,
        getLocalStorageProjectsSearch,
        getLocalStorageLoginUser,
        getLocalStorageLoginToken,
        getLocalStorageRefreshToken,
        getLocalStorageInputDataProjectSearch,
        getLocalStorageDisplayTutorialForIndexPage,
        getLocalStorageDisplayTutorialForSearchPage,
        getLocalStorageDisplayTutorialForCreatePage,
        removedLocalStorageProjectsSearch,
        clearLocalStorageLogin,
        clearCreatingProject,
        logout,
    }
}

export default useLocalStorageLogin;

