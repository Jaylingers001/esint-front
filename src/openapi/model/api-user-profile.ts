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
 * @interface ApiUserProfile
 */
export interface ApiUserProfile {
    /**
     *
     * @type {number}
     * @memberof ApiUserProfile
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    email?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    address1?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    address2?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    tel?: string;
    /**
     *
     * @type {ApiGenres}
     * @memberof ApiUserProfile
     */
    genres?: ApiGenres;
    /**
     *
     * @type {number}
     * @memberof ApiUserProfile
     */
    experienceYears?: number;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    selfIntroduction?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    profileImageUrl?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    profilePublicImageUrl?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    postalCode1?: string;
    /**
     *
     * @type {string}
     * @memberof ApiUserProfile
     */
    postalCode2?: string;
    /**
     *
     * @type {number}
     * @memberof ApiUserProfile
     */
    areaId?: number;
}


