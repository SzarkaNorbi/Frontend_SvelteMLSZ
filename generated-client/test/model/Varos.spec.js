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
    instance = new MlszApi.Varos();
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

  describe('Varos', function() {
    it('should create an instance of Varos', function() {
      // uncomment below and update the code to test Varos
      //var instance = new MlszApi.Varos();
      //expect(instance).to.be.a(MlszApi.Varos);
    });

    it('should have the property varosId (base name: "varosId")', function() {
      // uncomment below and update the code to test the property varosId
      //var instance = new MlszApi.Varos();
      //expect(instance).to.be();
    });

    it('should have the property varosNev (base name: "varosNev")', function() {
      // uncomment below and update the code to test the property varosNev
      //var instance = new MlszApi.Varos();
      //expect(instance).to.be();
    });

    it('should have the property nemzetisegId (base name: "nemzetisegId")', function() {
      // uncomment below and update the code to test the property nemzetisegId
      //var instance = new MlszApi.Varos();
      //expect(instance).to.be();
    });

  });

}));
