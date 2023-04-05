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


import {ApiGenres} from './api-genres';

/**
 *
 * @export
 * @interface ApiUserProfileShow
 */
export interface ApiUserProfileShow {
    /**
     *
     * @type {number}
     * @memberof ApiUserProfileShow
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    email?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    address1?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    tel?: string;
    /**
     *
     * @type {ApiGenres}
     * @memberof ApiUserProfileShow
     */
    genres?: ApiGenres;
    /**
     *
     * @type {number}
     * @memberof ApiUserProfileShow
     */
    experienceYears?: number;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    selfIntroduction?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    profileImageUrl?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    profilePublicImageUrl?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    postalCode1?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfileShow
     */
    postalCode2?: string;
    /**
     *
     * @type {number}
     * @memberof ApiUserProfileShow
     */
    areaId?: number;
}


