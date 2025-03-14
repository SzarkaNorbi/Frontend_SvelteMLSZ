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
    instance = new MlszApi.MediaApi();
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

  describe('MediaApi', function() {
    describe('mediaDownloadIdGet', function() {
      it('should call mediaDownloadIdGet successfully', function(done) {
        //uncomment below and update the code to test mediaDownloadIdGet
        //instance.mediaDownloadIdGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaFilesIdGet', function() {
      it('should call mediaFilesIdGet successfully', function(done) {
        //uncomment below and update the code to test mediaFilesIdGet
        //instance.mediaFilesIdGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaGet', function() {
      it('should call mediaGet successfully', function(done) {
        //uncomment below and update the code to test mediaGet
        //instance.mediaGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaIdDelete', function() {
      it('should call mediaIdDelete successfully', function(done) {
        //uncomment below and update the code to test mediaIdDelete
        //instance.mediaIdDelete(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaIdGet', function() {
      it('should call mediaIdGet successfully', function(done) {
        //uncomment below and update the code to test mediaIdGet
        //instance.mediaIdGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaIdPut', function() {
      it('should call mediaIdPut successfully', function(done) {
        //uncomment below and update the code to test mediaIdPut
        //instance.mediaIdPut(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('mediaPost', function() {
      it('should call mediaPost successfully', function(done) {
        //uncomment below and update the code to test mediaPost
        //instance.mediaPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
