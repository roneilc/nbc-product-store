package com.nbc.productstore.utils;

import com.nbc.productstore.models.CartRequest;
import com.nbc.productstore.models.ServiceError;

public class ValidationUtility {
    public static ServiceError validateCartRequest(CartRequest request) {
        if (request == null) return new ServiceError("INVALID_REQUEST", "Request is null");
        if (request.getProductId() <= 0) return new ServiceError("INVALID_PRODUCT_ID", "productId must be > 0");
        if (request.getQuantity() <= 0) return new ServiceError("INVALID_QUANTITY", "quantity must be > 0");
        return null;
    }
}
