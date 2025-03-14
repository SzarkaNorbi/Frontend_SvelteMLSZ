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
import Media from '../model/Media';
import MediaTipus from '../model/MediaTipus';

/**
* Media service.
* @module api/MediaApi
* @version v1.2
*/
export default class MediaApi {

    /**
    * Constructs a new MediaApi. 
    * @alias module:api/MediaApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the mediaDownloadIdGet operation.
     * @callback module:api/MediaApi~mediaDownloadIdGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MediaApi~mediaDownloadIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    mediaDownloadIdGet(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling mediaDownloadIdGet");
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
        '/Media/Download/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaFilesIdGet operation.
     * @callback module:api/MediaApi~mediaFilesIdGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MediaApi~mediaFilesIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    mediaFilesIdGet(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling mediaFilesIdGet");
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
        '/Media/Files/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaGet operation.
     * @callback module:api/MediaApi~mediaGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Media>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/MediaApi~mediaGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Media>}
     */
    mediaGet(callback) {
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
      let returnType = [Media];
      return this.apiClient.callApi(
        '/Media', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaIdDelete operation.
     * @callback module:api/MediaApi~mediaIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MediaApi~mediaIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    mediaIdDelete(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling mediaIdDelete");
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
        '/Media/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaIdGet operation.
     * @callback module:api/MediaApi~mediaIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Media} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/MediaApi~mediaIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Media}
     */
    mediaIdGet(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling mediaIdGet");
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
      let returnType = Media;
      return this.apiClient.callApi(
        '/Media/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaIdPut operation.
     * @callback module:api/MediaApi~mediaIdPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {Object} opts Optional parameters
     * @param {String} [leiras] 
     * @param {module:model/MediaTipus} [mediaTipus] 
     * @param {File} [file] 
     * @param {module:api/MediaApi~mediaIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
    mediaIdPut(id, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling mediaIdPut");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'leiras': opts['leiras'],
        'mediaTipus': opts['mediaTipus'],
        'file': opts['file']
      };

      let authNames = ['Bearer'];
      let contentTypes = ['multipart/form-data'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/Media/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the mediaPost operation.
     * @callback module:api/MediaApi~mediaPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Media} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} [leiras] 
     * @param {module:model/MediaTipus} [mediaTipus] 
     * @param {File} [file] 
     * @param {module:api/MediaApi~mediaPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Media}
     */
    mediaPost(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'leiras': opts['leiras'],
        'mediaTipus': opts['mediaTipus'],
        'file': opts['file']
      };

      let authNames = ['Bearer'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = Media;
      return this.apiClient.callApi(
        '/Media', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
