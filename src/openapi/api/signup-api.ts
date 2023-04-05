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
// @ts-ignore
// @ts-ignore
// @ts-ignore
import {
    ApiSignupAuthentication,
    ApiSignupComplete,
    ApiSignupInputToAdd,
    ApiSignupResult,
    ApiSignupSidCheck,
    ApiSmsLog
} from '../model';

/**
 * SignupApi - axios parameter creator
 * @export
 */
export const SignupApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a result message
         * @summary tel authentication
         * @param {ApiSmsLog} apiSmsLog
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupAuthenticationCode: async (apiSmsLog: ApiSmsLog, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiSmsLog' is not null or undefined
            assertParamExists('signupAuthenticationCode', 'apiSmsLog', apiSmsLog)
            const localVarPath = `/signup/telAuthentication`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiSmsLog, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a result message
         * @summary signup completed
         * @param {ApiSignupComplete} apiSignupComplete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupComplete: async (apiSignupComplete: ApiSignupComplete, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiSignupComplete' is not null or undefined
            assertParamExists('signupComplete', 'apiSignupComplete', apiSignupComplete)
            const localVarPath = `/signup/complete`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiSignupComplete, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a result message
         * @summary signup id and emailAuthenticationCode
         * @param {number} userId ID of user to return
         * @param {string} key emailAuthenticationCode to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupEmailAuthentication: async (userId: number, key: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('signupEmailAuthentication', 'userId', userId)
            // verify required parameter 'key' is not null or undefined
            assertParamExists('signupEmailAuthentication', 'key', key)
            const localVarPath = `/signup/emailAuthentication/{user.id}/{key}`
                .replace(`{${"user.id"}}`, encodeURIComponent(String(userId)))
                .replace(`{${"key"}}`, encodeURIComponent(String(key)));
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
         * @summary user input authenticate check
         * @param {ApiSignupInputToAdd} apiSignupInputToAdd
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupInputTest: async (apiSignupInputToAdd: ApiSignupInputToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiSignupInputToAdd' is not null or undefined
            assertParamExists('signupInputTest', 'apiSignupInputToAdd', apiSignupInputToAdd)
            const localVarPath = `/signup/input`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiSignupInputToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a result message
         * @summary tel authenticate check
         * @param {ApiSignupAuthentication} apiSignupAuthentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupTelTest: async (apiSignupAuthentication: ApiSignupAuthentication, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiSignupAuthentication' is not null or undefined
            assertParamExists('signupTelTest', 'apiSignupAuthentication', apiSignupAuthentication)
            const localVarPath = `/signup/tel`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiSignupAuthentication, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SignupApi - functional programming interface
 * @export
 */
export const SignupApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = SignupApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a result message
         * @summary tel authentication
         * @param {ApiSmsLog} apiSmsLog
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signupAuthenticationCode(apiSmsLog: ApiSmsLog, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signupAuthenticationCode(apiSmsLog, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a result message
         * @summary signup completed
         * @param {ApiSignupComplete} apiSignupComplete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signupComplete(apiSignupComplete: ApiSignupComplete, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSignupResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signupComplete(apiSignupComplete, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a result message
         * @summary signup id and emailAuthenticationCode
         * @param {number} userId ID of user to return
         * @param {string} key emailAuthenticationCode to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signupEmailAuthentication(userId: number, key: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signupEmailAuthentication(userId, key, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @summary user input authenticate check
         * @param {ApiSignupInputToAdd} apiSignupInputToAdd
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signupInputTest(apiSignupInputToAdd: ApiSignupInputToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signupInputTest(apiSignupInputToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a result message
         * @summary tel authenticate check
         * @param {ApiSignupAuthentication} apiSignupAuthentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signupTelTest(apiSignupAuthentication: ApiSignupAuthentication, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSignupSidCheck>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signupTelTest(apiSignupAuthentication, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SignupApi - factory interface
 * @export
 */
export const SignupApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SignupApiFp(configuration)
    return {
        /**
         * Returns a result message
         * @summary tel authentication
         * @param {ApiSmsLog} apiSmsLog
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupAuthenticationCode(apiSmsLog: ApiSmsLog, options?: any): AxiosPromise<void> {
            return localVarFp.signupAuthenticationCode(apiSmsLog, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a result message
         * @summary signup completed
         * @param {ApiSignupComplete} apiSignupComplete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupComplete(apiSignupComplete: ApiSignupComplete, options?: any): AxiosPromise<ApiSignupResult> {
            return localVarFp.signupComplete(apiSignupComplete, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a result message
         * @summary signup id and emailAuthenticationCode
         * @param {number} userId ID of user to return
         * @param {string} key emailAuthenticationCode to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupEmailAuthentication(userId: number, key: string, options?: any): AxiosPromise<void> {
            return localVarFp.signupEmailAuthentication(userId, key, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary user input authenticate check
         * @param {ApiSignupInputToAdd} apiSignupInputToAdd
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupInputTest(apiSignupInputToAdd: ApiSignupInputToAdd, options?: any): AxiosPromise<void> {
            return localVarFp.signupInputTest(apiSignupInputToAdd, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a result message
         * @summary tel authenticate check
         * @param {ApiSignupAuthentication} apiSignupAuthentication
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signupTelTest(apiSignupAuthentication: ApiSignupAuthentication, options?: any): AxiosPromise<ApiSignupSidCheck> {
            return localVarFp.signupTelTest(apiSignupAuthentication, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SignupApi - object-oriented interface
 * @export
 * @class SignupApi
 * @extends {BaseAPI}
 */
export class SignupApi extends BaseAPI {
    /**
     * Returns a result message
     * @summary tel authentication
     * @param {ApiSmsLog} apiSmsLog
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SignupApi
     */
    public signupAuthenticationCode(apiSmsLog: ApiSmsLog, options?: any) {
        return SignupApiFp(this.configuration).signupAuthenticationCode(apiSmsLog, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a result message
     * @summary signup completed
     * @param {ApiSignupComplete} apiSignupComplete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SignupApi
     */
    public signupComplete(apiSignupComplete: ApiSignupComplete, options?: any) {
        return SignupApiFp(this.configuration).signupComplete(apiSignupComplete, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a result message
     * @summary signup id and emailAuthenticationCode
     * @param {number} userId ID of user to return
     * @param {string} key emailAuthenticationCode to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SignupApi
     */
    public signupEmailAuthentication(userId: number, key: string, options?: any) {
        return SignupApiFp(this.configuration).signupEmailAuthentication(userId, key, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @summary user input authenticate check
     * @param {ApiSignupInputToAdd} apiSignupInputToAdd
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SignupApi
     */
    public signupInputTest(apiSignupInputToAdd: ApiSignupInputToAdd, options?: any) {
        return SignupApiFp(this.configuration).signupInputTest(apiSignupInputToAdd, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a result message
     * @summary tel authenticate check
     * @param {ApiSignupAuthentication} apiSignupAuthentication
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SignupApi
     */
    public signupTelTest(apiSignupAuthentication: ApiSignupAuthentication, options?: any) {
        return SignupApiFp(this.configuration).signupTelTest(apiSignupAuthentication, options).then((request) => request(this.axios, this.basePath));
    }
}
