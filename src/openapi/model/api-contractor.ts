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


import { ApiProjectApplication } from './api-project-application';
import { ApiUser } from './api-user';

/**
 *
 * @export
 * @interface ApiContractor
 */
export interface ApiContractor {
    /**
     *
     * @type {ApiUser}
     * @memberof ApiContractor
     */
    contractor: ApiUser;
    /**
     *
     * @type {ApiProjectApplication}
     * @memberof ApiContractor
     */
    projectApplication: ApiProjectApplication;
}


