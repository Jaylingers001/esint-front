/* tslint:disable */
/* eslint-disable */
/**
 * mtg_server
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
import {ApiUserFavoriteProject, ApiUserFavoriteProjectSingle, ApiUserFavoriteProjectToAdd} from '../model';

/**
 * UserFavoriteProjectApi - axios parameter creator
 * @export
 */
export const UserFavoriteProjectApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Add a new UserFavoriteProject
         * @param {ApiUserFavoriteProjectToAdd} apiUserFavoriteProjectToAdd UserFavoriteProject object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserFavoriteProject: async (apiUserFavoriteProjectToAdd: ApiUserFavoriteProjectToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiUserFavoriteProjectToAdd' is not null or undefined
            assertParamExists('addUserFavoriteProject', 'apiUserFavoriteProjectToAdd', apiUserFavoriteProjectToAdd)
            const localVarPath = `/userFavoriteProjects`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiUserFavoriteProjectToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Deletes a userFavoriteProject
         * @param {number} userFavoriteProjectId UserFavoriteProject id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserFavoriteProject: async (userFavoriteProjectId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'userFavoriteProjectId' is not null or undefined
            assertParamExists('deleteUserFavoriteProject', 'userFavoriteProjectId', userFavoriteProjectId)
            const localVarPath = `/userFavoriteProjects/{userFavoriteProjectId}`
                .replace(`{${"userFavoriteProjectId"}}`, encodeURIComponent(String(userFavoriteProjectId)));
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
         * Returns a single userFavoriteProject
         * @summary Find UserFavoriteProject by ID
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserFavoriteProjectById: async (userFavoriteProjectId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'userFavoriteProjectId' is not null or undefined
            assertParamExists('getUserFavoriteProjectById', 'userFavoriteProjectId', userFavoriteProjectId)
            const localVarPath = `/userFavoriteProjects/{userFavoriteProjectId}`
                .replace(`{${"userFavoriteProjectId"}}`, encodeURIComponent(String(userFavoriteProjectId)));
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
         * @summary Update an existing UserFavoriteProject
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {ApiUserFavoriteProject} apiUserFavoriteProject UserFavoriteProject object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUserFavoriteProject: async (userFavoriteProjectId: number, apiUserFavoriteProject: ApiUserFavoriteProject, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'userFavoriteProjectId' is not null or undefined
            assertParamExists('updateUserFavoriteProject', 'userFavoriteProjectId', userFavoriteProjectId)
            // verify required parameter 'apiUserFavoriteProject' is not null or undefined
            assertParamExists('updateUserFavoriteProject', 'apiUserFavoriteProject', apiUserFavoriteProject)
            const localVarPath = `/userFavoriteProjects/{userFavoriteProjectId}`
                .replace(`{${"userFavoriteProjectId"}}`, encodeURIComponent(String(userFavoriteProjectId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiUserFavoriteProject, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserFavoriteProjectApi - functional programming interface
 * @export
 */
export const UserFavoriteProjectApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = UserFavoriteProjectApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Add a new UserFavoriteProject
         * @param {ApiUserFavoriteProjectToAdd} apiUserFavoriteProjectToAdd UserFavoriteProject object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addUserFavoriteProject(apiUserFavoriteProjectToAdd: ApiUserFavoriteProjectToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiUserFavoriteProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addUserFavoriteProject(apiUserFavoriteProjectToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Deletes a userFavoriteProject
         * @param {number} userFavoriteProjectId UserFavoriteProject id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUserFavoriteProject(userFavoriteProjectId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiUserFavoriteProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserFavoriteProject(userFavoriteProjectId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a single userFavoriteProject
         * @summary Find UserFavoriteProject by ID
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserFavoriteProjectById(userFavoriteProjectId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiUserFavoriteProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserFavoriteProjectById(userFavoriteProjectId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Update an existing UserFavoriteProject
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {ApiUserFavoriteProject} apiUserFavoriteProject UserFavoriteProject object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUserFavoriteProject(userFavoriteProjectId: number, apiUserFavoriteProject: ApiUserFavoriteProject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiUserFavoriteProjectSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUserFavoriteProject(userFavoriteProjectId, apiUserFavoriteProject, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserFavoriteProjectApi - factory interface
 * @export
 */
export const UserFavoriteProjectApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserFavoriteProjectApiFp(configuration)
    return {
        /**
         *
         * @summary Add a new UserFavoriteProject
         * @param {ApiUserFavoriteProjectToAdd} apiUserFavoriteProjectToAdd UserFavoriteProject object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserFavoriteProject(apiUserFavoriteProjectToAdd: ApiUserFavoriteProjectToAdd, options?: any): AxiosPromise<ApiUserFavoriteProjectSingle> {
            return localVarFp.addUserFavoriteProject(apiUserFavoriteProjectToAdd, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Deletes a userFavoriteProject
         * @param {number} userFavoriteProjectId UserFavoriteProject id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserFavoriteProject(userFavoriteProjectId: number, options?: any): AxiosPromise<ApiUserFavoriteProjectSingle> {
            return localVarFp.deleteUserFavoriteProject(userFavoriteProjectId, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a single userFavoriteProject
         * @summary Find UserFavoriteProject by ID
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserFavoriteProjectById(userFavoriteProjectId: number, options?: any): AxiosPromise<ApiUserFavoriteProjectSingle> {
            return localVarFp.getUserFavoriteProjectById(userFavoriteProjectId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Update an existing UserFavoriteProject
         * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
         * @param {ApiUserFavoriteProject} apiUserFavoriteProject UserFavoriteProject object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUserFavoriteProject(userFavoriteProjectId: number, apiUserFavoriteProject: ApiUserFavoriteProject, options?: any): AxiosPromise<ApiUserFavoriteProjectSingle> {
            return localVarFp.updateUserFavoriteProject(userFavoriteProjectId, apiUserFavoriteProject, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserFavoriteProjectApi - object-oriented interface
 * @export
 * @class UserFavoriteProjectApi
 * @extends {BaseAPI}
 */
export class UserFavoriteProjectApi extends BaseAPI {
    /**
     *
     * @summary Add a new UserFavoriteProject
     * @param {ApiUserFavoriteProjectToAdd} apiUserFavoriteProjectToAdd UserFavoriteProject object that needs to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserFavoriteProjectApi
     */
    public addUserFavoriteProject(apiUserFavoriteProjectToAdd: ApiUserFavoriteProjectToAdd, options?: any) {
        return UserFavoriteProjectApiFp(this.configuration).addUserFavoriteProject(apiUserFavoriteProjectToAdd, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Deletes a userFavoriteProject
     * @param {number} userFavoriteProjectId UserFavoriteProject id to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserFavoriteProjectApi
     */
    public deleteUserFavoriteProject(userFavoriteProjectId: number, options?: any) {
        return UserFavoriteProjectApiFp(this.configuration).deleteUserFavoriteProject(userFavoriteProjectId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a single userFavoriteProject
     * @summary Find UserFavoriteProject by ID
     * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserFavoriteProjectApi
     */
    public getUserFavoriteProjectById(userFavoriteProjectId: number, options?: any) {
        return UserFavoriteProjectApiFp(this.configuration).getUserFavoriteProjectById(userFavoriteProjectId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Update an existing UserFavoriteProject
     * @param {number} userFavoriteProjectId ID of userFavoriteProject to return
     * @param {ApiUserFavoriteProject} apiUserFavoriteProject UserFavoriteProject object that needs to be added to the store
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserFavoriteProjectApi
     */
    public updateUserFavoriteProject(userFavoriteProjectId: number, apiUserFavoriteProject: ApiUserFavoriteProject, options?: any) {
        return UserFavoriteProjectApiFp(this.configuration).updateUserFavoriteProject(userFavoriteProjectId, apiUserFavoriteProject, options).then((request) => request(this.axios, this.basePath));
    }
}
