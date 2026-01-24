package com.nbc.productstore.models;

import java.util.List;

import com.nbc.productstore.models.product.Product;

public class RetrieveProductsListResponse {
    private String statusCode;
    private String statusDescription;
    private List<Product> products;

    public String getStatusCode() { return statusCode; }
    public void setStatusCode(String statusCode) { this.statusCode = statusCode; }
    public String getStatusDescription() { return statusDescription; }
    public void setStatusDescription(String statusDescription) { this.statusDescription = statusDescription; }
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
}
