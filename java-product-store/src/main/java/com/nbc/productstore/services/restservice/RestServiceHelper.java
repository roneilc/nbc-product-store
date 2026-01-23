package com.nbc.productstore.services.restservice;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class RestServiceHelper {

    public HttpEntity<Object> createHttpEntity(Object requestBody, HttpHeaders httpHeaders) {
        HttpEntity<Object> httpEntity = null;
        // create http entity
        if (requestBody != null) {
            httpEntity = new HttpEntity<>(requestBody, httpHeaders);
        } else {
            httpEntity = new HttpEntity<>(httpHeaders);
        }
        return httpEntity;
    }
}
