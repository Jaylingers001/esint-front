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


import {ApiProjectSearch} from './api-project-search';

/**
 *
 * @export
 * @interface ApiProjectsSearch
 */
export interface ApiProjectsSearch {
    /**
     *
     * @type {number}
     * @memberof ApiProjectsSearch
     */
    total?: number;
    /**
     *
     * @type {Array<ApiProjectSearch>}
     * @memberof ApiProjectsSearch
     */
    data?: Array<ApiProjectSearch>;
}


