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
import Verseny from '../model/Verseny';

/**
* Verseny service.
* @module api/VersenyApi
* @version v1.2
*/
export default class VersenyApi {

    /**
    * Constructs a new VersenyApi. 
    * @alias module:api/VersenyApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the versenyGet operation.
     * @callback module:api/VersenyApi~versenyGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Verseny>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/VersenyApi~versenyGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Verseny>}
     */
    versenyGet(callback) {
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
      let returnType = [Verseny];
      return this.apiClient.callApi(
        '/Verseny', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the versenyIdDelete operation.
     * @callback module:api/VersenyApi~versenyIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/VersenyApi~versenyIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    versenyIdDelete(id, opts, callback) {
      opts = opts || {}
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling versenyIdDelete");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let authToken = opts['authToken']; // Make sure to pass the token as an option when calling the method
      let headerParams = {
          'Authorization': `Bearer ${authToken}`  // Set the Authorization header
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/Verseny/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the versenyIdGet operation.
     * @callback module:api/VersenyApi~versenyIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Verseny} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/VersenyApi~versenyIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Verseny}
     */
    versenyIdGet(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling versenyIdGet");
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
      let returnType = Verseny;
      return this.apiClient.callApi(
        '/Verseny/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the versenyIdPut operation.
     * @callback module:api/VersenyApi~versenyIdPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {Object} opts Optional parameters
     * @param {module:model/Verseny} [verseny] 
     * @param {module:api/VersenyApi~versenyIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
    versenyIdPut(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['verseny'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling versenyIdPut");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let authToken = opts['authToken']; // Make sure to pass the token as an option when calling the method
      let headerParams = {
          'Authorization': `Bearer ${authToken}`  // Set the Authorization header
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json', 'text/json', 'application/*+json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/Verseny/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the versenyPost operation.
     * @callback module:api/VersenyApi~versenyPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Verseny} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/Verseny} [verseny] 
     * @param {module:api/VersenyApi~versenyPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Verseny}
     */
    versenyPost(opts, callback) {
      opts = opts || {};
      let postBody = opts['verseny'];

      let pathParams = {
      };
      let queryParams = {
      };
      let authToken = opts['authToken']; // Make sure to pass the token as an option when calling the method
      let headerParams = {
          'Authorization': `Bearer ${authToken}`  // Set the Authorization header
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json', 'text/json', 'application/*+json'];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Verseny;
      return this.apiClient.callApi(
        '/Verseny', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
