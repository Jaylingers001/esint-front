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
import {ApiPaymentSingle} from '../model';

/**
 * PaymentApi - axios parameter creator
 * @export
 */
export const PaymentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a single payment
         * @summary Find Payment by ID
         * @param {number} paymentId ID of payment to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentById: async (paymentId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            assertParamExists('getPaymentById', 'paymentId', paymentId)
            const localVarPath = `/payments/{paymentId}`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
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
    }
};

/**
 * PaymentApi - functional programming interface
 * @export
 */
export const PaymentApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = PaymentApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a single payment
         * @summary Find Payment by ID
         * @param {number} paymentId ID of payment to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPaymentById(paymentId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiPaymentSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPaymentById(paymentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PaymentApi - factory interface
 * @export
 */
export const PaymentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PaymentApiFp(configuration)
    return {
        /**
         * Returns a single payment
         * @summary Find Payment by ID
         * @param {number} paymentId ID of payment to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentById(paymentId: number, options?: any): AxiosPromise<ApiPaymentSingle> {
            return localVarFp.getPaymentById(paymentId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PaymentApi - object-oriented interface
 * @export
 * @class PaymentApi
 * @extends {BaseAPI}
 */
export class PaymentApi extends BaseAPI {
    /**
     * Returns a single payment
     * @summary Find Payment by ID
     * @param {number} paymentId ID of payment to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentApi
     */
    public getPaymentById(paymentId: number, options?: any) {
        return PaymentApiFp(this.configuration).getPaymentById(paymentId, options).then((request) => request(this.axios, this.basePath));
    }
}
