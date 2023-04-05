import {NEGATIVE_NUMBER_ONE} from "../const/constants";

const useEmptyPages = () => {
    const backToPrevPage = () => {

        window.postMessage(JSON.stringify({
            id: 'BACK_TO_PREV_PAGE',
        }), "*");

        // @ts-ignore
        window.history.back(NEGATIVE_NUMBER_ONE);
        return false;
    }

    return {
        backToPrevPage
    }
}
export default useEmptyPages;