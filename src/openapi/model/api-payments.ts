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


import { ApiPayment } from './api-payment';

/**
 * 
 * @export
 * @interface ApiPayments
 */
export interface ApiPayments {
    /**
     * 
     * @type {number}
     * @memberof ApiPayments
     */
    total?: number;
    /**
     * 
     * @type {Array<ApiPayment>}
     * @memberof ApiPayments
     */
    data?: Array<ApiPayment>;
}


