# MlszApi.StadionApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**stadionGet**](StadionApi.md#stadionGet) | **GET** /Stadion | 
[**stadionIdDelete**](StadionApi.md#stadionIdDelete) | **DELETE** /Stadion/{id} | 
[**stadionIdGet**](StadionApi.md#stadionIdGet) | **GET** /Stadion/{id} | 
[**stadionIdPut**](StadionApi.md#stadionIdPut) | **PUT** /Stadion/{id} | 
[**stadionPost**](StadionApi.md#stadionPost) | **POST** /Stadion | 



## stadionGet

> [Stadion] stadionGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.StadionApi();
apiInstance.stadionGet((error, data, response) => {
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

[**[Stadion]**](Stadion.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## stadionIdDelete

> stadionIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.StadionApi();
let id = 56; // Number | 
apiInstance.stadionIdDelete(id, (error, data, response) => {
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


## stadionIdGet

> Stadion stadionIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.StadionApi();
let id = 56; // Number | 
apiInstance.stadionIdGet(id, (error, data, response) => {
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

[**Stadion**](Stadion.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## stadionIdPut

> stadionIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.StadionApi();
let id = 56; // Number | 
let opts = {
  'stadion': new MlszApi.Stadion() // Stadion | 
};
apiInstance.stadionIdPut(id, opts, (error, data, response) => {
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
 **stadion** | [**Stadion**](Stadion.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## stadionPost

> Stadion stadionPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.StadionApi();
let opts = {
  'stadion': new MlszApi.Stadion() // Stadion | 
};
apiInstance.stadionPost(opts, (error, data, response) => {
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
 **stadion** | [**Stadion**](Stadion.md)|  | [optional] 

### Return type

[**Stadion**](Stadion.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

