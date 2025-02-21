/**
 * MLSZ_API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Nemzetiseg from '../model/Nemzetiseg';

/**
* Nemzetiseg service.
* @module api/NemzetisegApi
* @version v1.2
*/
export default class NemzetisegApi {

    /**
    * Constructs a new NemzetisegApi. 
    * @alias module:api/NemzetisegApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the nemzetisegGet operation.
     * @callback module:api/NemzetisegApi~nemzetisegGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Nemzetiseg>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/NemzetisegApi~nemzetisegGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Nemzetiseg>}
     */
    nemzetisegGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = [Nemzetiseg];
      return this.apiClient.callApi(
        '/Nemzetiseg', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the nemzetisegIdDelete operation.
     * @callback module:api/NemzetisegApi~nemzetisegIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/NemzetisegApi~nemzetisegIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    nemzetisegIdDelete(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling nemzetisegIdDelete");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/Nemzetiseg/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the nemzetisegIdGet operation.
     * @callback module:api/NemzetisegApi~nemzetisegIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Nemzetiseg} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/NemzetisegApi~nemzetisegIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Nemzetiseg}
     */
    nemzetisegIdGet(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling nemzetisegIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Nemzetiseg;
      return this.apiClient.callApi(
        '/Nemzetiseg/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the nemzetisegIdPut operation.
     * @callback module:api/NemzetisegApi~nemzetisegIdPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {Object} opts Optional parameters
     * @param {module:model/Nemzetiseg} [nemzetiseg] 
     * @param {module:api/NemzetisegApi~nemzetisegIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
    nemzetisegIdPut(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['nemzetiseg'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling nemzetisegIdPut");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json', 'text/json', 'application/*+json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/Nemzetiseg/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the nemzetisegPost operation.
     * @callback module:api/NemzetisegApi~nemzetisegPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Nemzetiseg} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/Nemzetiseg} [nemzetiseg] 
     * @param {module:api/NemzetisegApi~nemzetisegPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Nemzetiseg}
     */
    nemzetisegPost(opts, callback) {
      opts = opts || {};
      let postBody = opts['nemzetiseg'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json', 'text/json', 'application/*+json'];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Nemzetiseg;
      return this.apiClient.callApi(
        '/Nemzetiseg', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
