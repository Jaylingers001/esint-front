import LocalStoredNames from "./LocalStorage";

const CONFIG = () => {
    const tokens = localStorage.getItem(LocalStoredNames.LOGINACCESS);
    const CONFIG_DATA = {
        sort: 'id',
        order: 'ASC',
        start: 0,
        end: 9999,
        sortByPosition: 'position',
        orderByDesc: 'DESC'
    }

    const CONFIG_HEADER = () => {
        return {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${tokens}`,
                "method": 'GET'
            }
        };
    }

    return {
        CONFIG_DATA,
        CONFIG_HEADER
    }
}

export default CONFIG;