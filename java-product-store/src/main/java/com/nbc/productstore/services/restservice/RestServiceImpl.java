package com.nbc.productstore.services.restservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class RestServiceImpl implements RestService {

    private static final Logger logger = LoggerFactory.getLogger(RestServiceImpl.class);

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public <T> ResponseEntity<T> sendRequest(ParameterizedTypeReference<T> returnType, String requestUrl, HttpMethod httpMethod, Object requestBody) {
        logger.info("Sending {} request to URL: {}", httpMethod, requestUrl);
        
        // Validation
        if (httpMethod != HttpMethod.GET && httpMethod != HttpMethod.DELETE && requestBody == null) {
            logger.error("Request body is required for {} request", httpMethod);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            
            HttpEntity<Object> httpEntity = requestBody != null 
                ? new HttpEntity<>(requestBody)
                : null;

            ResponseEntity<T> responseEntity = restTemplate.exchange(
                requestUrl, 
                httpMethod, 
                httpEntity, 
                returnType
            );

            if (responseEntity != null && responseEntity.getStatusCode().is2xxSuccessful()) {
                logger.info("Successfully received response from {}: Status {}", 
                    requestUrl, responseEntity.getStatusCode());
                return responseEntity;
            }
            
            logger.warn("Received empty or unsuccessful response from {}", requestUrl);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            
        } catch (HttpClientErrorException ex) { //Error handling
            logger.error("Client error while calling {}: {} - {}", 
                requestUrl, ex.getStatusCode(), ex.getResponseBodyAsString(), ex);
            return new ResponseEntity<>(ex.getStatusCode());
            
        } catch (HttpServerErrorException ex) {
            logger.error("Server error while calling {}: {} - {}", 
                requestUrl, ex.getStatusCode(), ex.getResponseBodyAsString(), ex);
            return new ResponseEntity<>(ex.getStatusCode());
            
        } catch (RestClientException ex) {
            logger.error("Rest client exception while calling {}: {}", 
                requestUrl, ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            
        } catch (Exception ex) {
            logger.error("Unexpected error while calling {}: {}", 
                requestUrl, ex.getMessage(), ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
