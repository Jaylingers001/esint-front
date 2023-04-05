import React from "react";
import {CONFIGURATION} from "../util/api";
import {AreasApi} from "../openapi";
import CONFIG from "../const/DaoConfig";

const AreaDao = () => {
    const client = new AreasApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();

    const getAreaById = async (areaId: number) => {
        const result = await client.getAreaById(areaId, option);
        return result.data.data;
    };

    return {
        getAreaById,
    }
}
export default AreaDao
