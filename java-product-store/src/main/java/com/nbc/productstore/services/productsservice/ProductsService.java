package com.nbc.productstore.services.productsservice;

import java.util.List;

import com.nbc.productstore.models.product.Product;

public interface ProductsService {
    List<Product> getProducts();
}
