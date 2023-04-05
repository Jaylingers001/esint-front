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


import {ApiGenre} from './api-genre';
import {ApiProjectFile} from './api-project-file';

/**
 *
 * @export
 * @interface ApiOrdererProjectToAdd
 */
export interface ApiOrdererProjectToAdd {
    /**
     *
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    projectId?: number;
    /**
     *
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    recruitingStartDate: string;
    /**
     *
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    recruitingEndDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    projectName: string;
    /**
     * 
     * @type {Array<ApiGenre>}
     * @memberof ApiOrdererProjectToAdd
     */
    genres?: Array<ApiGenre>;
    /**
     * 
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    stock: number;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    workStartDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    workEndDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    restraintStartDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    restraintEndDate: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    postalCode1: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    postalCode2: string;
    /**
     * 
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    areaId: number;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    address1: string;
    /**
     * 
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    address2: string;
    /**
     * 
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    minPrice: number;
    /**
     * 
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    maxPrice: number;
    /**
     *
     * @type {string}
     * @memberof ApiOrdererProjectToAdd
     */
    description: string;
    /**
     *
     * @type {number}
     * @memberof ApiOrdererProjectToAdd
     */
    minimumExperienceYears: number;
    /**
     *
     * @type {Array<ApiProjectFile>}
     * @memberof ApiOrdererProjectToAdd
     */
    projectFiles?: Array<ApiProjectFile>;
}


