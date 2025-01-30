# MlszApi.GolApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**golGet**](GolApi.md#golGet) | **GET** /Gol | 
[**golIdDelete**](GolApi.md#golIdDelete) | **DELETE** /Gol/{id} | 
[**golIdGet**](GolApi.md#golIdGet) | **GET** /Gol/{id} | 
[**golIdPut**](GolApi.md#golIdPut) | **PUT** /Gol/{id} | 
[**golPost**](GolApi.md#golPost) | **POST** /Gol | 



## golGet

> [Gol] golGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.GolApi();
apiInstance.golGet((error, data, response) => {
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

[**[Gol]**](Gol.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## golIdDelete

> golIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.GolApi();
let id = 56; // Number | 
apiInstance.golIdDelete(id, (error, data, response) => {
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


## golIdGet

> Gol golIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.GolApi();
let id = 56; // Number | 
apiInstance.golIdGet(id, (error, data, response) => {
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

[**Gol**](Gol.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## golIdPut

> golIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.GolApi();
let id = 56; // Number | 
let opts = {
  'gol': new MlszApi.Gol() // Gol | 
};
apiInstance.golIdPut(id, opts, (error, data, response) => {
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
 **gol** | [**Gol**](Gol.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## golPost

> Gol golPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.GolApi();
let opts = {
  'gol': new MlszApi.Gol() // Gol | 
};
apiInstance.golPost(opts, (error, data, response) => {
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
 **gol** | [**Gol**](Gol.md)|  | [optional] 

### Return type

[**Gol**](Gol.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

