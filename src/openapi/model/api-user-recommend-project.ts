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
 * @interface ApiUserRecommendProject
 */
export interface ApiUserRecommendProject {
    /**
     * 
     * @type {number}
     * @memberof ApiUserRecommendProject
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiUserRecommendProject
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiUserRecommendProject
     */
    userId: number;
    /**
     * 
     * @type {number}
     * @memberof ApiUserRecommendProject
     */
    projectId: number;
    /**
     * 
     * @type {number}
     * @memberof ApiUserRecommendProject
     */
    point: number;
}


