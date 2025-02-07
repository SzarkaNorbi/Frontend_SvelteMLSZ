# MlszApi.MerkozesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**merkozesGet**](MerkozesApi.md#merkozesGet) | **GET** /Merkozes | 
[**merkozesIdDelete**](MerkozesApi.md#merkozesIdDelete) | **DELETE** /Merkozes/{id} | 
[**merkozesIdGet**](MerkozesApi.md#merkozesIdGet) | **GET** /Merkozes/{id} | 
[**merkozesIdPut**](MerkozesApi.md#merkozesIdPut) | **PUT** /Merkozes/{id} | 
[**merkozesPost**](MerkozesApi.md#merkozesPost) | **POST** /Merkozes | 



## merkozesGet

> [Merkozes] merkozesGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.MerkozesApi();
apiInstance.merkozesGet((error, data, response) => {
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

[**[Merkozes]**](Merkozes.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## merkozesIdDelete

> merkozesIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.MerkozesApi();
let id = 56; // Number | 
apiInstance.merkozesIdDelete(id, (error, data, response) => {
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


## merkozesIdGet

> Merkozes merkozesIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.MerkozesApi();
let id = 56; // Number | 
apiInstance.merkozesIdGet(id, (error, data, response) => {
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

[**Merkozes**](Merkozes.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## merkozesIdPut

> merkozesIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.MerkozesApi();
let id = 56; // Number | 
let opts = {
  'merkozes': new MlszApi.Merkozes() // Merkozes | 
};
apiInstance.merkozesIdPut(id, opts, (error, data, response) => {
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
 **merkozes** | [**Merkozes**](Merkozes.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## merkozesPost

> Merkozes merkozesPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.MerkozesApi();
let opts = {
  'merkozes': new MlszApi.Merkozes() // Merkozes | 
};
apiInstance.merkozesPost(opts, (error, data, response) => {
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
 **merkozes** | [**Merkozes**](Merkozes.md)|  | [optional] 

### Return type

[**Merkozes**](Merkozes.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

