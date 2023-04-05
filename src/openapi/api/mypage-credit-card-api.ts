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
import {ApiMypageCreditCard} from '../model';
import CONFIG from "../../const/DaoConfig";

/**
 * MypageCreditCardApi - axios parameter creator
 * @export
 */
export const MypageCreditCardApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary update a Mypage Credit Card
         * @param {ApiMypageCreditCard} apiMypageCreditCard contractor project that needs to be completed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addMypageCreditCard: async (apiMypageCreditCard: ApiMypageCreditCard, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiMypageCreditCard' is not null or undefined
            assertParamExists('addMypageCreditCard', 'apiMypageCreditCard', apiMypageCreditCard)
            const localVarPath = `/mypage/creditCard`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            let localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarHeaderParameter = CONFIG().CONFIG_HEADER().headers

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiMypageCreditCard, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @summary Find Mypage Credit Card
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMypageCreditCard: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/mypage/creditCard`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            let localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarHeaderParameter = CONFIG().CONFIG_HEADER().headers

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MypageCreditCardApi - functional programming interface
 * @export
 */
export const MypageCreditCardApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = MypageCreditCardApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary update a Mypage Credit Card
         * @param {ApiMypageCreditCard} apiMypageCreditCard contractor project that needs to be completed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addMypageCreditCard(apiMypageCreditCard: ApiMypageCreditCard, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addMypageCreditCard(apiMypageCreditCard, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary Find Mypage Credit Card
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMypageCreditCard(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiMypageCreditCard>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMypageCreditCard(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MypageCreditCardApi - factory interface
 * @export
 */
export const MypageCreditCardApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MypageCreditCardApiFp(configuration)
    return {
        /**
         *
         * @summary update a Mypage Credit Card
         * @param {ApiMypageCreditCard} apiMypageCreditCard contractor project that needs to be completed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addMypageCreditCard(apiMypageCreditCard: ApiMypageCreditCard, options?: any): AxiosPromise<void> {
            return localVarFp.addMypageCreditCard(apiMypageCreditCard, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Find Mypage Credit Card
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMypageCreditCard(options?: any): AxiosPromise<ApiMypageCreditCard> {
            return localVarFp.getMypageCreditCard(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MypageCreditCardApi - object-oriented interface
 * @export
 * @class MypageCreditCardApi
 * @extends {BaseAPI}
 */
export class MypageCreditCardApi extends BaseAPI {
    /**
     *
     * @summary update a Mypage Credit Card
     * @param {ApiMypageCreditCard} apiMypageCreditCard contractor project that needs to be completed
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MypageCreditCardApi
     */
    public addMypageCreditCard(apiMypageCreditCard: ApiMypageCreditCard, options?: any) {
        return MypageCreditCardApiFp(this.configuration).addMypageCreditCard(apiMypageCreditCard, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary Find Mypage Credit Card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MypageCreditCardApi
     */
    public getMypageCreditCard(options?: any) {
        return MypageCreditCardApiFp(this.configuration).getMypageCreditCard(options).then((request) => request(this.axios, this.basePath));
    }
}
