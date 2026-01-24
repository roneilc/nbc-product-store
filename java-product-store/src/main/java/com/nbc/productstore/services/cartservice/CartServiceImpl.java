package com.nbc.productstore.services.cartservice;

import com.nbc.productstore.models.cart.CartItem;
import com.nbc.productstore.models.cart.CartRequest;
import com.nbc.productstore.models.product.Product;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    private final List<CartItem> items = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void addItem(CartRequest request) {
        synchronized (items) {
            for (CartItem it : items) {
                if (it.getProductId() == request.getProductId()) {
                    it.setQuantity(it.getQuantity() + request.getQuantity());
                    return;
                }
            }
            String name = "Product " + request.getProductId();
            items.add(new CartItem(request.getProductId(), name, request.getQuantity()));
        }
    }

    @Override
    public List<CartItem> getCartItems() {
        synchronized (items) {
            return new ArrayList<>(items);
        }
    }
}
