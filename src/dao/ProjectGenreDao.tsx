import React from 'react';
import CONFIG from "../const/DaoConfig";
import {ProjectGenresApi} from "../openapi";
import {CONFIGURATION} from "../components/util/api";

const ProjectGenreDao = () => {
    const option = CONFIG().CONFIG_HEADER();
    const client = new ProjectGenresApi(CONFIGURATION);

    const getProjectGenreById  = async (id: number) => {
        const result = await client.getProjectGenreById(id, option);
        return result.data.data;
    }

    return {
        getProjectGenreById
    }
}

export default ProjectGenreDao;