import React from "react";
import {CONFIGURATION} from "../util/api";
import {ContactApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {ApiContact} from "../openapi/model"
import {AxiosResponse} from "axios";

const ContactDao = () => {
    const client = new ContactApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const sendMessage = async (data: ApiContact) => {

    let result: AxiosResponse<void> | boolean;
    result = await client.addContact(data, option).catch(() => {
            return false;
        });

    return result;
    };

    return {
        sendMessage
    }
}
export default ContactDao
