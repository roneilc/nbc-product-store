package com.nbc.productstore.models;

import java.util.List;

public class RetrieveProductsListResponse {
    private int statusCode;
    private String statusDescription;
    private List<Product> products;

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
    public String getStatusDescription() { return statusDescription; }
    public void setStatusDescription(String statusDescription) { this.statusDescription = statusDescription; }
    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
}
