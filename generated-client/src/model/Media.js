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
import MediaTipus from './MediaTipus';

/**
 * The Media model module.
 * @module model/Media
 * @version v1.2
 */
class Media {
    /**
     * Constructs a new <code>Media</code>.
     * @alias module:model/Media
     */
    constructor() { 
        
        Media.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Media</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Media} obj Optional instance to populate.
     * @return {module:model/Media} The populated <code>Media</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Media();

            if (data.hasOwnProperty('mediaId')) {
                obj['mediaId'] = ApiClient.convertToType(data['mediaId'], 'Number');
            }
            if (data.hasOwnProperty('mediaTipus')) {
                obj['mediaTipus'] = MediaTipus.constructFromObject(data['mediaTipus']);
            }
            if (data.hasOwnProperty('leiras')) {
                obj['leiras'] = ApiClient.convertToType(data['leiras'], 'String');
            }
            if (data.hasOwnProperty('feltoltesIdo')) {
                obj['feltoltesIdo'] = ApiClient.convertToType(data['feltoltesIdo'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Media</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Media</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['leiras'] && !(typeof data['leiras'] === 'string' || data['leiras'] instanceof String)) {
            throw new Error("Expected the field `leiras` to be a primitive type in the JSON string but got " + data['leiras']);
        }

        return true;
    }


}



/**
 * @member {Number} mediaId
 */
Media.prototype['mediaId'] = undefined;

/**
 * @member {module:model/MediaTipus} mediaTipus
 */
Media.prototype['mediaTipus'] = undefined;

/**
 * @member {String} leiras
 */
Media.prototype['leiras'] = undefined;

/**
 * @member {Date} feltoltesIdo
 */
Media.prototype['feltoltesIdo'] = undefined;






export default Media;

