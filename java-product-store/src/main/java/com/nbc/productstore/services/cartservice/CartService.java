package com.nbc.productstore.services.cartservice;

import java.util.List;

import com.nbc.productstore.models.cart.CartItem;
import com.nbc.productstore.models.cart.CartRequest;

public interface CartService {
    void addItem(CartRequest request);
    List<CartItem> getCartItems();
    void clearCart();
}
