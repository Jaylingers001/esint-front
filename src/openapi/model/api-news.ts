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



/**
 * 
 * @export
 * @interface ApiNews
 */
export interface ApiNews {
    /**
     * 
     * @type {number}
     * @memberof ApiNews
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiNews
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiNews
     */
    userId?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiNews
     */
    displayStartDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiNews
     */
    displayEndDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiNews
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ApiNews
     */
    body: string;
}


