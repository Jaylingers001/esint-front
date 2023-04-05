import React from 'react';
import {
    ApiMypageProjectApplicationToAdd,
    MypageProjectApplicationsForFrontApi,
    ProjectApplicationsApi
} from "../openapi";
import CONFIG from "../const/DaoConfig";
import {CONFIGURATION} from "../components/util/api";
import {ApiProjectApplication} from '../openapi';

const ProjectApplicationsDao = () => {
    const client = new ProjectApplicationsApi(CONFIGURATION);
    const addProjectApplication = new MypageProjectApplicationsForFrontApi(CONFIGURATION);
    const option = CONFIG().CONFIG_HEADER();
    const getAllProjectApplications = async () => {

        const results = await client.getAllProjectApplications(undefined,
            CONFIG().CONFIG_DATA.sort,
            CONFIG().CONFIG_DATA.order,
            CONFIG().CONFIG_DATA.start,
            CONFIG().CONFIG_DATA.end,
            option
        );

        return results.data.data;
    }

    const getProjectById = async (id: number) => {
        const result = await client.getProjectApplicationById(id, option);
        return result.data.data

    }

    const updateProjectApplication = async (id: number, data: ApiProjectApplication) => {
        const result = await client.updateProjectApplication(id, data, option);
    }

    const createProjectApplication = async (projectId: number, apiMypageProjectApplicationToAdd: ApiMypageProjectApplicationToAdd) => {
        const data = await addProjectApplication.addMypageProjectApplicationFromFront(projectId,apiMypageProjectApplicationToAdd,option)
        return data.data.data
    }

    const createThread = async (projectId: number) => {
        const data = await addProjectApplication.getMypageProjectApplicationsCreateThread(projectId, option)
        return data.data;
    }



    return {
        getAllProjectApplications,
        getProjectById,
        updateProjectApplication,
        createProjectApplication,
        createThread,
    }
}

export default ProjectApplicationsDao;