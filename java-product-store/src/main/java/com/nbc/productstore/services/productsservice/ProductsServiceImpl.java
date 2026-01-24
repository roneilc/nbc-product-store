package com.nbc.productstore.services.productsservice;

import com.nbc.productstore.models.product.Product;
import com.nbc.productstore.models.product.ProductResponse;
import com.nbc.productstore.services.restservice.RestServiceImpl;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    RestServiceImpl restService;

    @Override
    public List<Product> getProducts() {

        List<Product> list = new ArrayList<>();
        
        try {

            ResponseEntity<ProductResponse> responseEntity = restService.sendRequest(new ParameterizedTypeReference<ProductResponse>() {}, "https://dummyjson.com/products", HttpMethod.GET, null);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(mapper.writeValueAsString(responseEntity.getBody()));
                JsonNode products = root.get("products");

                if (products != null && products.isArray()) {
                    for (JsonNode p : products) {
                        int id = p.path("id").asInt();
                        String title = p.path("title").asText("");
                        String description = p.path("description").asText("");
                        double price = p.path("price").asDouble(0.0);
                        String thumbnail = p.path("thumbnail").asText("");
                        list.add(new Product(id, title, description, price, thumbnail));
                    }
                }
            } else {
               
            }
        } catch (Exception ex) {
          
        }
        return list;
    }
}
