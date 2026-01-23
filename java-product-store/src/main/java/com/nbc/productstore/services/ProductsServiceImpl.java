package com.nbc.productstore.services;

import com.nbc.productstore.models.Product;
import com.nbc.productstore.services.restservice.RestServiceImpl;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
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

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://dummyjson.com/products"))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.body());
                JsonNode products = root.get("products");

                if (products != null && products.isArray()) {
                    for (JsonNode p : products) {
                        int id = p.path("id").asInt();
                        String title = p.path("title").asText("");
                        String description = p.path("description").asText("");
                        double price = p.path("price").asDouble(0.0);
                        list.add(new Product(id, title, description, price));
                    }
                }
            } else {
               
            }
        } catch (Exception ex) {
          
        }
        return list;
    }
}
