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


import globalAxios, {AxiosPromise, AxiosInstance} from 'axios';
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
import {ApiProjectsSearch, ApiProjectToSearch} from '../model';

/**
 * ProjectsSearchApi - axios parameter creator
 * @export
 */
export const ProjectsSearchApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Returns projects/search
         * @param {ApiProjectToSearch} apiProjectToSearch projectSearch object that needs to be added to the search
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllProjectsForFront: async (apiProjectToSearch: ApiProjectToSearch, sort?: string, order?: string, start?: number, end?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiProjectToSearch' is not null or undefined
            assertParamExists('getAllProjectsForFront', 'apiProjectToSearch', apiProjectToSearch)
            const localVarPath = `/projects/search`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
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
 * ProjectsSearchApi - functional programming interface
 * @export
 */
export const ProjectsSearchApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = ProjectsSearchApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Returns projects/search
         * @param {ApiProjectToSearch} apiProjectToSearch projectSearch object that needs to be added to the search
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllProjectsForFront(apiProjectToSearch: ApiProjectToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiProjectsSearch>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllProjectsForFront(apiProjectToSearch, sort, order, start, end, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProjectsSearchApi - factory interface
 * @export
 */
export const ProjectsSearchApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProjectsSearchApiFp(configuration)
    return {
        /**
         *
         * @summary Returns projects/search
         * @param {ApiProjectToSearch} apiProjectToSearch projectSearch object that needs to be added to the search
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllProjectsForFront(apiProjectToSearch: ApiProjectToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any): AxiosPromise<ApiProjectsSearch> {
            return localVarFp.getAllProjectsForFront(apiProjectToSearch, sort, order, start, end, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProjectsSearchApi - object-oriented interface
 * @export
 * @class ProjectsSearchApi
 * @extends {BaseAPI}
 */
export class ProjectsSearchApi extends BaseAPI {
    /**
     *
     * @summary Returns projects/search
     * @param {ApiProjectToSearch} apiProjectToSearch projectSearch object that needs to be added to the search
     * @param {string} [sort] sorting column
     * @param {string} [order] ASC / DESC
     * @param {number} [start] Start position of retrieved data
     * @param {number} [end] End position of retrieved data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProjectsSearchApi
     */
    public getAllProjectsForFront(apiProjectToSearch: ApiProjectToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any) {
        return ProjectsSearchApiFp(this.configuration).getAllProjectsForFront(apiProjectToSearch, sort, order, start, end, options).then((request) => request(this.axios, this.basePath));
    }
}
