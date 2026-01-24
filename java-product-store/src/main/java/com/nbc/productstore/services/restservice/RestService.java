package com.nbc.productstore.services.restservice;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public interface RestService {

    <T> ResponseEntity<T> sendRequest(ParameterizedTypeReference<T> returnType,
                                      String requestUrl,
                                      HttpMethod httpMethod,
                                      Object requestBody);
}
