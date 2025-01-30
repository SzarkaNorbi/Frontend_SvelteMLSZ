# MlszApi.NemzetisegApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**nemzetisegGet**](NemzetisegApi.md#nemzetisegGet) | **GET** /Nemzetiseg | 
[**nemzetisegIdDelete**](NemzetisegApi.md#nemzetisegIdDelete) | **DELETE** /Nemzetiseg/{id} | 
[**nemzetisegIdGet**](NemzetisegApi.md#nemzetisegIdGet) | **GET** /Nemzetiseg/{id} | 
[**nemzetisegIdPut**](NemzetisegApi.md#nemzetisegIdPut) | **PUT** /Nemzetiseg/{id} | 
[**nemzetisegPost**](NemzetisegApi.md#nemzetisegPost) | **POST** /Nemzetiseg | 



## nemzetisegGet

> [Nemzetiseg] nemzetisegGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.NemzetisegApi();
apiInstance.nemzetisegGet((error, data, response) => {
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

[**[Nemzetiseg]**](Nemzetiseg.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## nemzetisegIdDelete

> nemzetisegIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.NemzetisegApi();
let id = 56; // Number | 
apiInstance.nemzetisegIdDelete(id, (error, data, response) => {
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


## nemzetisegIdGet

> Nemzetiseg nemzetisegIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.NemzetisegApi();
let id = 56; // Number | 
apiInstance.nemzetisegIdGet(id, (error, data, response) => {
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

[**Nemzetiseg**](Nemzetiseg.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## nemzetisegIdPut

> nemzetisegIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.NemzetisegApi();
let id = 56; // Number | 
let opts = {
  'nemzetiseg': new MlszApi.Nemzetiseg() // Nemzetiseg | 
};
apiInstance.nemzetisegIdPut(id, opts, (error, data, response) => {
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
 **nemzetiseg** | [**Nemzetiseg**](Nemzetiseg.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## nemzetisegPost

> Nemzetiseg nemzetisegPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.NemzetisegApi();
let opts = {
  'nemzetiseg': new MlszApi.Nemzetiseg() // Nemzetiseg | 
};
apiInstance.nemzetisegPost(opts, (error, data, response) => {
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
 **nemzetiseg** | [**Nemzetiseg**](Nemzetiseg.md)|  | [optional] 

### Return type

[**Nemzetiseg**](Nemzetiseg.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

