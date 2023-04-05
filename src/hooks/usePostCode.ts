import {useEffect} from "react";
import {loadScript} from "../components/util/javascriptUtil";

export const usePostCode = () => {

    useEffect(() => {
        loadScript('https://ajaxzip3.github.io/ajaxzip3.js').then();
    }, [0]);

    /**
     *
     * @param setValue if we avoid any, pwp-common needs react-form-hook library. if we will chose that, you can refer how to apply it by git log
     */
    const getAddressValues = () => {
        return {
            address1: (document.getElementById('address1Auto') as HTMLInputElement).value,
            address2: (document.getElementById('address2Auto') as HTMLInputElement).value,
        }
    };

    const loadAddress = () => {
        // @ts-ignore
        const {AjaxZip3} = window;
        AjaxZip3.zip2addr('postalCode1', 'postalCode2', 'address1Auto', 'address2Auto');
    };

    return {getAddressValues, loadAddress};
}
