package com.nbc.productstore.controllers;

import com.nbc.productstore.models.RetrieveProductsListResponse;
import com.nbc.productstore.models.product.Product;
import com.nbc.productstore.services.productsservice.ProductsService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/java/api/Products")
public class ProductsController {
    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping(value = "/RetrieveProductsList", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RetrieveProductsListResponse> retrieveProductsList() {
        RetrieveProductsListResponse res = new RetrieveProductsListResponse();
        try {
            List<Product> products = productsService.getProducts();
            if (products != null && !products.isEmpty()) {
                res.setStatusCode(200);
                res.setStatusDescription("SUCCESS");
                res.setProducts(products);
            } else {
                res.setStatusCode(500);
                res.setStatusDescription("FAIL");
                res.setProducts(List.of());
            }
        } catch (Exception ex) {
            res.setStatusCode(500);
            res.setStatusDescription("FAIL");
            res.setProducts(List.of());
        }

        return ResponseEntity.ok(res);
    }
}
