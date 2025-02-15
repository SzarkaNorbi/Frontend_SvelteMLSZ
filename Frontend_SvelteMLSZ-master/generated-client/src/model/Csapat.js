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

import ApiClient from '../ApiClient';
import CsapatStatusz from './CsapatStatusz';

/**
 * The Csapat model module.
 * @module model/Csapat
 * @version v1.2
 */
class Csapat {
    /**
     * Constructs a new <code>Csapat</code>.
     * @alias module:model/Csapat
     */
    constructor() { 
        
        Csapat.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Csapat</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Csapat} obj Optional instance to populate.
     * @return {module:model/Csapat} The populated <code>Csapat</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Csapat();

            if (data.hasOwnProperty('csapatId')) {
                obj['csapatId'] = ApiClient.convertToType(data['csapatId'], 'Number');
            }
            if (data.hasOwnProperty('csapatNev')) {
                obj['csapatNev'] = ApiClient.convertToType(data['csapatNev'], 'String');
            }
            if (data.hasOwnProperty('alapitasDatum')) {
                obj['alapitasDatum'] = ApiClient.convertToType(data['alapitasDatum'], 'Date');
            }
            if (data.hasOwnProperty('jelenlegiEdzo')) {
                obj['jelenlegiEdzo'] = ApiClient.convertToType(data['jelenlegiEdzo'], 'String');
            }
            if (data.hasOwnProperty('stadionId')) {
                obj['stadionId'] = ApiClient.convertToType(data['stadionId'], 'Number');
            }
            if (data.hasOwnProperty('statusz')) {
                obj['statusz'] = CsapatStatusz.constructFromObject(data['statusz']);
            }
            if (data.hasOwnProperty('media_Id')) {
                obj['media_Id'] = ApiClient.convertToType(data['media_Id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Csapat</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Csapat</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['csapatNev'] && !(typeof data['csapatNev'] === 'string' || data['csapatNev'] instanceof String)) {
            throw new Error("Expected the field `csapatNev` to be a primitive type in the JSON string but got " + data['csapatNev']);
        }
        // ensure the json data is a string
        if (data['jelenlegiEdzo'] && !(typeof data['jelenlegiEdzo'] === 'string' || data['jelenlegiEdzo'] instanceof String)) {
            throw new Error("Expected the field `jelenlegiEdzo` to be a primitive type in the JSON string but got " + data['jelenlegiEdzo']);
        }

        return true;
    }


}



/**
 * @member {Number} csapatId
 */
Csapat.prototype['csapatId'] = undefined;

/**
 * @member {String} csapatNev
 */
Csapat.prototype['csapatNev'] = undefined;

/**
 * @member {Date} alapitasDatum
 */
Csapat.prototype['alapitasDatum'] = undefined;

/**
 * @member {String} jelenlegiEdzo
 */
Csapat.prototype['jelenlegiEdzo'] = undefined;

/**
 * @member {Number} stadionId
 */
Csapat.prototype['stadionId'] = undefined;

/**
 * @member {module:model/CsapatStatusz} statusz
 */
Csapat.prototype['statusz'] = undefined;

/**
 * @member {Number} media_Id
 */
Csapat.prototype['media_Id'] = undefined;






export default Csapat;

