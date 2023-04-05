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


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ApiNotification } from '../model';
// @ts-ignore
import { ApiNotificationSingle } from '../model';
// @ts-ignore
import { ApiNotificationToAdd } from '../model';
// @ts-ignore
import { ApiNotificationToSearch } from '../model';
// @ts-ignore
import { ApiNotifications } from '../model';
/**
 * NotificationsApi - axios parameter creator
 * @export
 */
export const NotificationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Add a new notification
         * @param {ApiNotificationToAdd} apiNotificationToAdd notification object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addNotification: async (apiNotificationToAdd: ApiNotificationToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiNotificationToAdd' is not null or undefined
            assertParamExists('addNotification', 'apiNotificationToAdd', apiNotificationToAdd)
            const localVarPath = `/admin/notifications`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiNotificationToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Deletes a notification
         * @param {number} notificationId notification id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteNotification: async (notificationId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'notificationId' is not null or undefined
            assertParamExists('deleteNotification', 'notificationId', notificationId)
            const localVarPath = `/admin/notifications/{notificationId}`
                .replace(`{${"notificationId"}}`, encodeURIComponent(String(notificationId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @summary Returns notifications 
         * @param {ApiNotificationToSearch} [filter] 
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllNotifications: async (filter?: ApiNotificationToSearch, sort?: string, order?: string, start?: number, end?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/admin/notifications`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (filter !== undefined) {
                localVarQueryParameter['_filter'] = filter;
            }

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
         * Returns a single notification
         * @summary Find notification by ID
         * @param {number} notificationId ID of notification to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNotificationById: async (notificationId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'notificationId' is not null or undefined
            assertParamExists('getNotificationById', 'notificationId', notificationId)
            const localVarPath = `/admin/notifications/{notificationId}`
                .replace(`{${"notificationId"}}`, encodeURIComponent(String(notificationId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * @summary Update an existing notification
         * @param {number} notificationId ID of notification to return
         * @param {ApiNotification} apiNotification notification object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateNotification: async (notificationId: number, apiNotification: ApiNotification, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'notificationId' is not null or undefined
            assertParamExists('updateNotification', 'notificationId', notificationId)
            // verify required parameter 'apiNotification' is not null or undefined
            assertParamExists('updateNotification', 'apiNotification', apiNotification)
            const localVarPath = `/admin/notifications/{notificationId}`
                .replace(`{${"notificationId"}}`, encodeURIComponent(String(notificationId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiNotification, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * NotificationsApi - functional programming interface
 * @export
 */
export const NotificationsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = NotificationsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Add a new notification
         * @param {ApiNotificationToAdd} apiNotificationToAdd notification object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addNotification(apiNotificationToAdd: ApiNotificationToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiNotificationSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addNotification(apiNotificationToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Deletes a notification
         * @param {number} notificationId notification id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteNotification(notificationId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiNotificationSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteNotification(notificationId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Returns notifications 
         * @param {ApiNotificationToSearch} [filter] 
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllNotifications(filter?: ApiNotificationToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiNotifications>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllNotifications(filter, sort, order, start, end, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a single notification
         * @summary Find notification by ID
         * @param {number} notificationId ID of notification to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getNotificationById(notificationId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiNotificationSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getNotificationById(notificationId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update an existing notification
         * @param {number} notificationId ID of notification to return
         * @param {ApiNotification} apiNotification notification object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateNotification(notificationId: number, apiNotification: ApiNotification, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiNotificationSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateNotification(notificationId, apiNotification, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * NotificationsApi - factory interface
 * @export
 */
export const NotificationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = NotificationsApiFp(configuration)
    return {
        /**
         * 
         * @summary Add a new notification
         * @param {ApiNotificationToAdd} apiNotificationToAdd notification object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addNotification(apiNotificationToAdd: ApiNotificationToAdd, options?: any): AxiosPromise<ApiNotificationSingle> {
            return localVarFp.addNotification(apiNotificationToAdd, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Deletes a notification
         * @param {number} notificationId notification id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteNotification(notificationId: number, options?: any): AxiosPromise<ApiNotificationSingle> {
            return localVarFp.deleteNotification(notificationId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Returns notifications 
         * @param {ApiNotificationToSearch} [filter] 
         * @param {string} [sort] sorting column
         * @param {string} [order] ASC / DESC
         * @param {number} [start] Start position of retrieved data
         * @param {number} [end] End position of retrieved data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllNotifications(filter?: ApiNotificationToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any): AxiosPromise<ApiNotifications> {
            return localVarFp.getAllNotifications(filter, sort, order, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a single notification
         * @summary Find notification by ID
         * @param {number} notificationId ID of notification to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNotificationById(notificationId: number, options?: any): AxiosPromise<ApiNotificationSingle> {
            return localVarFp.getNotificationById(notificationId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update an existing notification
         * @param {number} notificationId ID of notification to return
         * @param {ApiNotification} apiNotification notification object that needs to be added to the store
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateNotification(notificationId: number, apiNotification: ApiNotification, options?: any): AxiosPromise<ApiNotificationSingle> {
            return localVarFp.updateNotification(notificationId, apiNotification, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * NotificationsApi - object-oriented interface
 * @export
 * @class NotificationsApi
 * @extends {BaseAPI}
 */
export class NotificationsApi extends BaseAPI {
    /**
     * 
     * @summary Add a new notification
     * @param {ApiNotificationToAdd} apiNotificationToAdd notification object that needs to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public addNotification(apiNotificationToAdd: ApiNotificationToAdd, options?: any) {
        return NotificationsApiFp(this.configuration).addNotification(apiNotificationToAdd, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Deletes a notification
     * @param {number} notificationId notification id to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public deleteNotification(notificationId: number, options?: any) {
        return NotificationsApiFp(this.configuration).deleteNotification(notificationId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Returns notifications 
     * @param {ApiNotificationToSearch} [filter] 
     * @param {string} [sort] sorting column
     * @param {string} [order] ASC / DESC
     * @param {number} [start] Start position of retrieved data
     * @param {number} [end] End position of retrieved data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public getAllNotifications(filter?: ApiNotificationToSearch, sort?: string, order?: string, start?: number, end?: number, options?: any) {
        return NotificationsApiFp(this.configuration).getAllNotifications(filter, sort, order, start, end, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a single notification
     * @summary Find notification by ID
     * @param {number} notificationId ID of notification to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public getNotificationById(notificationId: number, options?: any) {
        return NotificationsApiFp(this.configuration).getNotificationById(notificationId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update an existing notification
     * @param {number} notificationId ID of notification to return
     * @param {ApiNotification} apiNotification notification object that needs to be added to the store
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public updateNotification(notificationId: number, apiNotification: ApiNotification, options?: any) {
        return NotificationsApiFp(this.configuration).updateNotification(notificationId, apiNotification, options).then((request) => request(this.axios, this.basePath));
    }
}
