package com.nbc.productstore.services.cartservice;

import com.nbc.productstore.models.cart.CartItem;
import com.nbc.productstore.models.cart.CartRequest;
import com.nbc.productstore.models.product.Product;
import com.nbc.productstore.services.productsservice.ProductsService;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    private final List<CartItem> items = Collections.synchronizedList(new ArrayList<>());
    private final ProductsService productsService;

    public CartServiceImpl(ProductsService productsService) {
        this.productsService = productsService;
    }

    @Override
    public void addItem(CartRequest request) {
        synchronized (items) {
            // Get all products to find product details
            List<Product> products = productsService.getProducts();
            Product product = products.stream()
                .filter(p -> p.getId() == request.getProductId())
                .findFirst()
                .orElse(null);

            if (product == null) {
                // Product not found
                return;
            }

            // Check if item already exists in cart
            for (CartItem it : items) {
                if (it.getId() == request.getProductId()) {
                    it.setQuantity(it.getQuantity() + request.getQuantity());
                    it.setSubtotal(it.getPrice() * it.getQuantity());
                    return;
                }
            }

            // Add new item with full product details
            double subtotal = product.getPrice() * request.getQuantity();
            items.add(new CartItem(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getThumbnail(),
                request.getQuantity(),
                subtotal
            ));
        }
    }

    @Override
    public List<CartItem> getCartItems() {
        synchronized (items) {
            return new ArrayList<>(items);
        }
    }
}
