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



/**
 * 
 * @export
 * @interface ApiGenreTree
 */
export interface ApiGenreTree {
    /**
     * 
     * @type {number}
     * @memberof ApiGenreTree
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiGenreTree
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiGenreTree
     */
    position?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiGenreTree
     */
    parentId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof ApiGenreTree
     */
    childrenIds?: Array<number>;
}


