/* tslint:disable */
/* eslint-disable */
/**
 * esint_server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, {AxiosInstance, AxiosPromise} from 'axios';
import {Configuration} from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {
    assertParamExists,
    createRequestFunction,
    DUMMY_BASE_URL,
    serializeDataIfNeeded,
    setApiKeyToObject,
    setBasicAuthToObject,
    setBearerAuthToObject,
    setOAuthToObject,
    setSearchParams,
    toPathString
} from '../common';
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from '../base';
// @ts-ignore
// @ts-ignore
// @ts-ignore
import {ApiProject, ApiProjectSingle, ApiProjectToAdd} from '../model';

/**
 * ProjectApi - axios parameter creator
 * @export
 */
export const ProjectApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Add a new Project
         * @param {ApiProjectToAdd} apiProjectToAdd Project object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addProject: async (apiProjectToAdd: ApiProjectToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiProjectToAdd' is not null or undefined
            assertParamExists('addProject', 'apiProjectToAdd', apiProjectToAdd)
            const localVarPath = `/projects`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiProjectToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Deletes a project
         * @param {number} projectId Project id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteProject: async (projectId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'projectId' is not null or undefined
            assertParamExists('deleteProject', 'projectId', projectId)
            const localVarPath = `/projects/{projectId}`
                .replace(`{${"projectId"}}`, encodeURIComponent(String(projectId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a single project
         * @summary Find Project by ID
         * @param {number} projectId ID of project to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProjectById: async (projectId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'projectId' is not null or undefined
            assertParamExists('getProjectById', 'projectId', projectId)
            const localVarPath = `/projects/{projectId}`
                .replace(`{${"projectId"}}`, encodeURIComponent(String(projectId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Update an existing Project
         * @param {number} projectId ID of project to return
         * @param {ApiProject} apiProject Project object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateProject: async (projectId: number, apiProject: ApiProject, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'projectId' is not null or undefined
            assertParamExists('updateProject', 'projectId', projectId)
            // verify required parameter 'apiProject' is not null or undefined
            assertParamExists('updateProject', 'apiProject', apiProject)
            const localVarPath = `/projects/{projectId}`
                .replace(`{${"projectId"}}`, encodeURIComponent(String(projectId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiProject, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ProjectApi - functional programming interface
 * @export
 */
export const ProjectApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = ProjectApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Add a new Project
         * @param {ApiProjectToAdd} apiProjectToAdd Project object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addProject(apiProjectToAdd: ApiProjectToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addProject(apiProjectToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Deletes a project
         * @param {number} projectId Project id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteProject(projectId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteProject(projectId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a single project
         * @summary Find Project by ID
         * @param {number} projectId ID of project to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProjectById(projectId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProjectById(projectId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Update an existing Project
         * @param {number} projectId ID of project to return
         * @param {ApiProject} apiProject Project object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateProject(projectId: number, apiProject: ApiProject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateProject(projectId, apiProject, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProjectApi - factory interface
 * @export
 */
export const ProjectApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProjectApiFp(configuration)
    return {
        /**
         *
         * @summary Add a new Project
         * @param {ApiProjectToAdd} apiProjectToAdd Project object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addProject(apiProjectToAdd: ApiProjectToAdd, options?: any): AxiosPromise<ApiProjectSingle> {
            return localVarFp.addProject(apiProjectToAdd, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Deletes a project
         * @param {number} projectId Project id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteProject(projectId: number, options?: any): AxiosPromise<ApiProjectSingle> {
            return localVarFp.deleteProject(projectId, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a single project
         * @summary Find Project by ID
         * @param {number} projectId ID of project to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProjectById(projectId: number, options?: any): AxiosPromise<ApiProjectSingle> {
            return localVarFp.getProjectById(projectId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Update an existing Project
         * @param {number} projectId ID of project to return
         * @param {ApiProject} apiProject Project object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateProject(projectId: number, apiProject: ApiProject, options?: any): AxiosPromise<ApiProjectSingle> {
            return localVarFp.updateProject(projectId, apiProject, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProjectApi - object-oriented interface
 * @export
 * @class ProjectApi
 * @extends {BaseAPI}
 */
export class ProjectApi extends BaseAPI {
    /**
     *
     * @summary Add a new Project
     * @param {ApiProjectToAdd} apiProjectToAdd Project object that needs to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectApi
     */
    public addProject(apiProjectToAdd: ApiProjectToAdd, options?: any) {
        return ProjectApiFp(this.configuration).addProject(apiProjectToAdd, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Deletes a project
     * @param {number} projectId Project id to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectApi
     */
    public deleteProject(projectId: number, options?: any) {
        return ProjectApiFp(this.configuration).deleteProject(projectId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a single project
     * @summary Find Project by ID
     * @param {number} projectId ID of project to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectApi
     */
    public getProjectById(projectId: number, options?: any) {
        return ProjectApiFp(this.configuration).getProjectById(projectId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Update an existing Project
     * @param {number} projectId ID of project to return
     * @param {ApiProject} apiProject Project object that needs to be added to the store
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectApi
     */
    public updateProject(projectId: number, apiProject: ApiProject, options?: any) {
        return ProjectApiFp(this.configuration).updateProject(projectId, apiProject, options).then((request) => request(this.axios, this.basePath));
    }
}
