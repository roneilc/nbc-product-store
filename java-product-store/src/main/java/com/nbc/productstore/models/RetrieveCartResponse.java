package com.nbc.productstore.models;

import java.util.List;

import com.nbc.productstore.models.cart.CartItem;

public class RetrieveCartResponse {
    private int statusCode;
    private String statusDescription;
    private List<CartItem> items;
    private ServiceError error;

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
    public String getStatusDescription() { return statusDescription; }
    public void setStatusDescription(String statusDescription) { this.statusDescription = statusDescription; }
    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }
    public ServiceError getError() { return error; }
    public void setError(ServiceError error) { this.error = error; }
}
