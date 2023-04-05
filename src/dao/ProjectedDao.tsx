import React from 'react';
import {ProjectsShowApi} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {CONFIGURATION} from "../components/util/api";

const ProjectedDao = () => {
    const client = new ProjectsShowApi(CONFIGURATION)
    const option = CONFIG().CONFIG_HEADER();

    const getById = async (projectId: number) => {
        const results = await client.getProjectByIdForFront(projectId, option)
        return results.data.data;
    }

    return {
        getById
    }
}

export default ProjectedDao;