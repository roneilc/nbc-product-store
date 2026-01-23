package com.nbc.productstore.controllers;

import com.nbc.productstore.models.CartItem;
import com.nbc.productstore.models.CartRequest;
import com.nbc.productstore.models.RetrieveCartResponse;
import com.nbc.productstore.models.ServiceError;
import com.nbc.productstore.services.CartService;
import com.nbc.productstore.utils.ValidationUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/java/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/addItem")
    public ResponseEntity<RetrieveCartResponse> addItem(@RequestBody CartRequest request) {
        RetrieveCartResponse res = new RetrieveCartResponse();
        try {
            ServiceError se = ValidationUtility.validateCartRequest(request);
            if (se != null) {
                res.setStatusCode(400);
                res.setStatusDescription("FAIL");
                res.setError(se);
                res.setItems(List.of());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            cartService.addItem(request);
            List<CartItem> items = cartService.getCartItems();
            if (items != null && !items.isEmpty()) {
                res.setStatusCode(200);
                res.setStatusDescription("SUCCESS");
                res.setItems(items);
            } else {
                res.setStatusCode(500);
                res.setStatusDescription("FAIL");
            }
        } catch (Exception ex) {
            res.setStatusCode(500);
            res.setStatusDescription("FAIL");
            res.setError(new ServiceError("HTTP_ERROR", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

        return ResponseEntity.ok(res);
    }

    @GetMapping("/getCart")
    public ResponseEntity<RetrieveCartResponse> getCart() {
        RetrieveCartResponse res = new RetrieveCartResponse();
        try {
            List<CartItem> items = cartService.getCartItems();
            if (items != null && !items.isEmpty()) {
                res.setStatusCode(200);
                res.setStatusDescription("SUCCESS");
                res.setItems(items);
            } else {
                res.setStatusCode(204);
                res.setStatusDescription("EMPTY");
            }
        } catch (Exception ex) {
            res.setStatusCode(500);
            res.setStatusDescription("FAIL");
            res.setError(new ServiceError("HTTP_ERROR", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

        return ResponseEntity.ok(res);
    }
}
