package com.nbc.productstore.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbc.productstore.models.RetrieveCartResponse;
import com.nbc.productstore.models.ServiceError;
import com.nbc.productstore.models.cart.CartItem;
import com.nbc.productstore.models.cart.CartRequest;
import com.nbc.productstore.services.cartservice.CartService;
import com.nbc.productstore.utils.ValidationUtility;

@RestController
@RequestMapping("/java/api/Cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/AddItem")
    public ResponseEntity<RetrieveCartResponse> addItem(@RequestBody CartRequest request) {
        RetrieveCartResponse res = new RetrieveCartResponse();
        try {
            ServiceError se = ValidationUtility.validateCartRequest(request);
            if (se != null) {
                res.setStatusCode("1");
                res.setStatusDescription("fail");
                res.setError(se);
                res.setItems(List.of());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            cartService.addItem(request);
            List<CartItem> items = cartService.getCartItems();
            if (items != null && !items.isEmpty()) {
                res.setStatusCode("0");
                res.setStatusDescription("success");
                res.setItems(items);
            } else {
                res.setStatusCode("1");
                res.setStatusDescription("fail");
            }
        } catch (Exception ex) {
            res.setStatusCode("1");
            res.setStatusDescription("fail");
            res.setError(new ServiceError("HTTP_ERROR", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

        return ResponseEntity.ok(res);
    }

    @GetMapping("/GetCart")
    public ResponseEntity<RetrieveCartResponse> getCart() {
        RetrieveCartResponse res = new RetrieveCartResponse();
        try {
            List<CartItem> items = cartService.getCartItems();
            if (items != null && !items.isEmpty()) {
                res.setStatusCode("0");
                res.setStatusDescription("success");
                res.setItems(items);
            } else {
                res.setStatusCode("2");
                res.setStatusDescription("empty");
            }
        } catch (Exception ex) {
            res.setStatusCode("1");
            res.setStatusDescription("fail");
            res.setError(new ServiceError("HTTP_ERROR", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/ClearCart")
    public ResponseEntity<RetrieveCartResponse> clearCart() {
        RetrieveCartResponse res = new RetrieveCartResponse();
        try {
            cartService.clearCart();
            res.setStatusCode("0");
            res.setStatusDescription("success");
            res.setItems(List.of());
        } catch (Exception ex) {
            res.setStatusCode("1");
            res.setStatusDescription("fail");
            res.setError(new ServiceError("HTTP_ERROR", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

        return ResponseEntity.ok(res);
    }
}
