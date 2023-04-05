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
// @ts-ignore
// @ts-ignore
import {
    ApiProject,
    ApiProjects,
    ApiProjectSingle,
    ApiProjectsSearch,
    ApiProjectToAdd,
    ApiProjectToSearch
} from '../model';

/**
 * ProjectsApi - axios parameter creator
 * @export
 */
export const ProjectsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Returns Project for api
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {ApiProjectToSearch} [apiProjectToSearch]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllProjectsSearch: async (sort?: string, order?: string, start?: number, end?: number, apiProjectToSearch?: ApiProjectToSearch, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/project/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (sort !== undefined) {
                localVarQueryParameter['_sort'] = sort;
            }

            if (order !== undefined) {
                localVarQueryParameter['_order'] = order;
            }

            if (start !== undefined) {
                localVarQueryParameter['_start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['_end'] = end;
            }



            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiProjectToSearch, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ProjectsApi - functional programming interface
 * @export
 */
export const ProjectsApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = ProjectsApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Returns Project for api
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {ApiProjectToSearch} [apiProjectToSearch]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllProjectsSearch(sort?: string, order?: string, start?: number, end?: number, apiProjectToSearch?: ApiProjectToSearch, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectsSearch>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllProjectsSearch(sort, order, start, end, apiProjectToSearch, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProjectsApi - factory interface
 * @export
 */
export const ProjectsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProjectsApiFp(configuration)
    return {
        /**
         *
         * @summary Returns Project for api
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {ApiProjectToSearch} [apiProjectToSearch]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllProjectsSearch(sort?: string, order?: string, start?: number, end?: number, apiProjectToSearch?: ApiProjectToSearch, options?: any): AxiosPromise<ApiProjectsSearch> {
            return localVarFp.getAllProjectsSearch(sort, order, start, end, apiProjectToSearch, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProjectsApi - object-oriented interface
 * @export
 * @class ProjectsApi
 * @extends {BaseAPI}
 */
export class ProjectsApi extends BaseAPI {
    /**
     *
     * @summary Returns Project for api
     * @param {string} [sort] sorting column
     * @param {string} [order] ASC / DESC
     * @param {number} [start] Start position of retrieved data
     * @param {number} [end] End position of retrieved data
     * @param {ApiProjectToSearch} [apiProjectToSearch]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectsApi
     */
    public getAllProjectsSearch(sort?: string, order?: string, start?: number, end?: number, apiProjectToSearch?: ApiProjectToSearch, options?: any) {
        return ProjectsApiFp(this.configuration).getAllProjectsSearch(sort, order, start, end, apiProjectToSearch, options).then((request) => request(this.axios, this.basePath));
    }
}
