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
 * @interface ApiProjectApplication
 */
export interface ApiProjectApplication {
    /**
     * 
     * @type {number}
     * @memberof ApiProjectApplication
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof ApiProjectApplication
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof ApiProjectApplication
     */
    updatedAt?: string;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    projectId: number;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    contractorId: number;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    status: number;
    /**
     *
     * @type {string}
     * @memberof ApiProjectApplication
     */
    confirmationCode?: string;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    contractorPrice: number;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    ordererPrice: number;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    definitePrice: number;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    cancelPrice: number;
    /**
     *
     * @type {boolean}
     * @memberof ApiProjectApplication
     */
    immediateReceivingFlag: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ApiProjectApplication
     */
    negotiationFlag: boolean;
    /**
     *
     * @type {boolean}
     * @memberof ApiProjectApplication
     */
    questionFlag: boolean;
    /**
     *
     * @type {string}
     * @memberof ApiProjectApplication
     */
    contractorComment?: string;
    /**
     *
     * @type {number}
     * @memberof ApiProjectApplication
     */
    messageStatus: number;
    /**
     *
     * @type {boolean}
     * @memberof ApiProjectApplication
     */
    unreadFlag: boolean;
}


