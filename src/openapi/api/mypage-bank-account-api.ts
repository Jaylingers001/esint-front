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
import {ApiMypageBankAccount, ApiMypageBankAccountToAdd} from '../model';

/**
 * MypageBankAccountApi - axios parameter creator
 * @export
 */
export const MypageBankAccountApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Returns mypageBankAccount
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllMypageBankAccount: async (sort?: string, order?: string, start?: number, end?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/mypage/bankAccount`;
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
         * @summary Update an existing mypageBankAccount
         * @param {ApiMypageBankAccountToAdd} apiMypageBankAccountToAdd mypage bank account object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMypageBankAccount: async (apiMypageBankAccountToAdd: ApiMypageBankAccountToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiMypageBankAccountToAdd' is not null or undefined
            assertParamExists('updateMypageBankAccount', 'apiMypageBankAccountToAdd', apiMypageBankAccountToAdd)
            const localVarPath = `/mypage/bankAccount`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiMypageBankAccountToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MypageBankAccountApi - functional programming interface
 * @export
 */
export const MypageBankAccountApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = MypageBankAccountApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Returns mypageBankAccount
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllMypageBankAccount(sort?: string, order?: string, start?: number, end?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiMypageBankAccount>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllMypageBankAccount(sort, order, start, end, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Update an existing mypageBankAccount
         * @param {ApiMypageBankAccountToAdd} apiMypageBankAccountToAdd mypage bank account object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMypageBankAccount(apiMypageBankAccountToAdd: ApiMypageBankAccountToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiMypageBankAccount>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateMypageBankAccount(apiMypageBankAccountToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MypageBankAccountApi - factory interface
 * @export
 */
export const MypageBankAccountApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MypageBankAccountApiFp(configuration)
    return {
        /**
         *
         * @summary Returns mypageBankAccount
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllMypageBankAccount(sort?: string, order?: string, start?: number, end?: number, options?: any): AxiosPromise<ApiMypageBankAccount> {
            return localVarFp.getAllMypageBankAccount(sort, order, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Update an existing mypageBankAccount
         * @param {ApiMypageBankAccountToAdd} apiMypageBankAccountToAdd mypage bank account object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMypageBankAccount(apiMypageBankAccountToAdd: ApiMypageBankAccountToAdd, options?: any): AxiosPromise<ApiMypageBankAccount> {
            return localVarFp.updateMypageBankAccount(apiMypageBankAccountToAdd, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MypageBankAccountApi - object-oriented interface
 * @export
 * @class MypageBankAccountApi
 * @extends {BaseAPI}
 */
export class MypageBankAccountApi extends BaseAPI {
    /**
     *
     * @summary Returns mypageBankAccount
     * @param {string} [sort] sorting column
     * @param {string} [order] ASC / DESC
     * @param {number} [start] Start position of retrieved data
     * @param {number} [end] End position of retrieved data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MypageBankAccountApi
     */
    public getAllMypageBankAccount(sort?: string, order?: string, start?: number, end?: number, options?: any) {
        return MypageBankAccountApiFp(this.configuration).getAllMypageBankAccount(sort, order, start, end, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Update an existing mypageBankAccount
     * @param {ApiMypageBankAccountToAdd} apiMypageBankAccountToAdd mypage bank account object that needs to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MypageBankAccountApi
     */
    public updateMypageBankAccount(apiMypageBankAccountToAdd: ApiMypageBankAccountToAdd, options?: any) {
        return MypageBankAccountApiFp(this.configuration).updateMypageBankAccount(apiMypageBankAccountToAdd, options).then((request) => request(this.axios, this.basePath));
    }
}
