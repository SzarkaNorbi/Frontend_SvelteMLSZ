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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.MlszApi);
  }
}(this, function(expect, MlszApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new MlszApi.Csapat();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('Csapat', function() {
    it('should create an instance of Csapat', function() {
      // uncomment below and update the code to test Csapat
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be.a(MlszApi.Csapat);
    });

    it('should have the property csapatId (base name: "csapatId")', function() {
      // uncomment below and update the code to test the property csapatId
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property csapatNev (base name: "csapatNev")', function() {
      // uncomment below and update the code to test the property csapatNev
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property alapitasDatum (base name: "alapitasDatum")', function() {
      // uncomment below and update the code to test the property alapitasDatum
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property jelenlegiEdzo (base name: "jelenlegiEdzo")', function() {
      // uncomment below and update the code to test the property jelenlegiEdzo
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property stadionId (base name: "stadionId")', function() {
      // uncomment below and update the code to test the property stadionId
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property statusz (base name: "statusz")', function() {
      // uncomment below and update the code to test the property statusz
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

    it('should have the property mediaId (base name: "media_Id")', function() {
      // uncomment below and update the code to test the property mediaId
      //var instance = new MlszApi.Csapat();
      //expect(instance).to.be();
    });

  });

}));
