package com.nbc.productstore.services;

import com.nbc.productstore.models.CartItem;
import com.nbc.productstore.models.CartRequest;

import java.util.List;

public interface CartService {
    void addItem(CartRequest request);
    List<CartItem> getCartItems();
}
