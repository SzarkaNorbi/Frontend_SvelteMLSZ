# MlszApi.SzankcioApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**szankcioGet**](SzankcioApi.md#szankcioGet) | **GET** /Szankcio | 
[**szankcioIdDelete**](SzankcioApi.md#szankcioIdDelete) | **DELETE** /Szankcio/{id} | 
[**szankcioIdGet**](SzankcioApi.md#szankcioIdGet) | **GET** /Szankcio/{id} | 
[**szankcioIdPut**](SzankcioApi.md#szankcioIdPut) | **PUT** /Szankcio/{id} | 
[**szankcioPost**](SzankcioApi.md#szankcioPost) | **POST** /Szankcio | 



## szankcioGet

> [Szankcio] szankcioGet()



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.SzankcioApi();
apiInstance.szankcioGet((error, data, response) => {
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

[**[Szankcio]**](Szankcio.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## szankcioIdDelete

> szankcioIdDelete(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.SzankcioApi();
let id = 56; // Number | 
apiInstance.szankcioIdDelete(id, (error, data, response) => {
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


## szankcioIdGet

> Szankcio szankcioIdGet(id)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.SzankcioApi();
let id = 56; // Number | 
apiInstance.szankcioIdGet(id, (error, data, response) => {
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

[**Szankcio**](Szankcio.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## szankcioIdPut

> szankcioIdPut(id, opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.SzankcioApi();
let id = 56; // Number | 
let opts = {
  'szankcio': new MlszApi.Szankcio() // Szankcio | 
};
apiInstance.szankcioIdPut(id, opts, (error, data, response) => {
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
 **szankcio** | [**Szankcio**](Szankcio.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: Not defined


## szankcioPost

> Szankcio szankcioPost(opts)



### Example

```javascript
import MlszApi from 'mlsz_api';
let defaultClient = MlszApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MlszApi.SzankcioApi();
let opts = {
  'szankcio': new MlszApi.Szankcio() // Szankcio | 
};
apiInstance.szankcioPost(opts, (error, data, response) => {
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
 **szankcio** | [**Szankcio**](Szankcio.md)|  | [optional] 

### Return type

[**Szankcio**](Szankcio.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: text/plain, application/json, text/json

