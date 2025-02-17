# MlszApi.VarosApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**varosGet**](VarosApi.md#varosGet) | **GET** /Varos | 
[**varosIdDelete**](VarosApi.md#varosIdDelete) | **DELETE** /Varos/{id} | 
[**varosIdGet**](VarosApi.md#varosIdGet) | **GET** /Varos/{id} | 
[**varosIdPut**](VarosApi.md#varosIdPut) | **PUT** /Varos/{id} | 
[**varosPost**](VarosApi.md#varosPost) | **POST** /Varos | 



## varosGet

> [Varos] varosGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.VarosApi();
apiInstance.varosGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Varos]**](Varos.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## varosIdDelete

> varosIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.VarosApi();
let id = 56; // Number | 
apiInstance.varosIdDelete(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## varosIdGet

> Varos varosIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.VarosApi();
let id = 56; // Number | 
apiInstance.varosIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**Varos**](Varos.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## varosIdPut

> varosIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.VarosApi();
let id = 56; // Number | 
let opts = {
  'varos': new MlszApi.Varos() // Varos | 
};
apiInstance.varosIdPut(id, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **varos** | [**Varos**](Varos.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## varosPost

> Varos varosPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.VarosApi();
let opts = {
  'varos': new MlszApi.Varos() // Varos | 
};
apiInstance.varosPost(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **varos** | [**Varos**](Varos.md)|  | [optional] 

### Return type

[**Varos**](Varos.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

