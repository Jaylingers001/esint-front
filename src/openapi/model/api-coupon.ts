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
 * @interface ApiCoupon
 */
export interface ApiCoupon {
    /**
     * 
     * @type {number}
     * @memberof ApiCoupon
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiCoupon
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ApiCoupon
     */
    code: string;
    /**
     * 
     * @type {number}
     * @memberof ApiCoupon
     */
    price: number;
    /**
     * 
     * @type {string}
     * @memberof ApiCoupon
     */
    limitDate?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiCoupon
     */
    createdAt?: string;
}


