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
import {ApiUserGenre, ApiUserGenres, ApiUserGenreSingle, ApiUserGenreToAdd} from '../model';

/**
 * UserGenresApi - axios parameter creator
 * @export
 */
export const UserGenresApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary Add a new userGenre
         * @param {ApiUserGenreToAdd} apiUserGenreToAdd userGenre object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserGenre: async (apiUserGenreToAdd: ApiUserGenreToAdd, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiUserGenreToAdd' is not null or undefined
            assertParamExists('addUserGenre', 'apiUserGenreToAdd', apiUserGenreToAdd)
            const localVarPath = `/userGenres`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiUserGenreToAdd, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserGenresApi - functional programming interface
 * @export
 */
export const UserGenresApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = UserGenresApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @summary Add a new userGenre
         * @param {ApiUserGenreToAdd} apiUserGenreToAdd userGenre object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addUserGenre(apiUserGenreToAdd: ApiUserGenreToAdd, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiUserGenreSingle>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addUserGenre(apiUserGenreToAdd, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserGenresApi - factory interface
 * @export
 */
export const UserGenresApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserGenresApiFp(configuration)
    return {
        /**
         *
         * @summary Add a new userGenre
         * @param {ApiUserGenreToAdd} apiUserGenreToAdd userGenre object that needs to be added
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserGenre(apiUserGenreToAdd: ApiUserGenreToAdd, options?: any): AxiosPromise<ApiUserGenreSingle> {
            return localVarFp.addUserGenre(apiUserGenreToAdd, options).then((request) => request(axios, basePath));
        },
    }
};

/**
 * UserGenresApi - object-oriented interface
 * @export
 * @class UserGenresApi
 * @extends {BaseAPI}
 */
export class UserGenresApi extends BaseAPI {
    /**
     *
     * @summary Add a new userGenre
     * @param {ApiUserGenreToAdd} apiUserGenreToAdd userGenre object that needs to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserGenresApi
     */
    public addUserGenre(apiUserGenreToAdd: ApiUserGenreToAdd, options?: any) {
        return UserGenresApiFp(this.configuration).addUserGenre(apiUserGenreToAdd, options).then((request) => request(this.axios, this.basePath));
    }
}
