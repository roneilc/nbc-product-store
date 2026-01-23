package com.nbc.productstore.services.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class RestServiceImpl implements RestService {

    @Autowired
    private RestServiceHelper restServiceHelper;

    @Override
    public <T> ResponseEntity<T> sendRequest(Class<T> returnType, String requestUrl, HttpMethod httpMethod, Object requestBody, HttpHeaders headers, RestTemplate restTemplate) {
        if (requestUrl == null || restTemplate == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        final HttpHeaders httpHeaders = (headers != null) ? headers : new HttpHeaders();
        if (!httpHeaders.containsKey(HttpHeaders.CONTENT_TYPE)) {
            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        }

        HttpEntity<?> httpEntity = restServiceHelper.createHttpEntity(requestBody, httpHeaders);

        try {
            ResponseEntity<T> responseEntity = restTemplate.exchange(requestUrl, httpMethod, httpEntity, returnType);
            if (responseEntity != null) {
                return responseEntity;
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RestClientException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
