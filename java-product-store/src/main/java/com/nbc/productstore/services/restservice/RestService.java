package com.nbc.productstore.services.restservice;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public interface RestService {

    <T> ResponseEntity<T> sendRequest(Class<T> returnType,
                                      String requestUrl,
                                      HttpMethod httpMethod,
                                      Object requestBody,
                                      HttpHeaders headers,
                                      RestTemplate restTemplate);
}
