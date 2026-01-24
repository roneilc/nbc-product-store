import { Injectable, signal } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem, RetrieveCartResponse } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  cartCount = signal<number>(0);
  cartItems = signal<CartItem[]>([]);

  constructor(private _cartService: CartService) {}

  addToCart(productId: number, quantity: number = 1) {
    const payload = { productId, quantity };
    this._cartService.addItem(payload).subscribe({
      next: (res) => {
        if (res && res.items) {
          this.cartItems.set(res.items);
          const totalQty = res.items.reduce((s, it) => s + (it.quantity || 0), 0);
          this.cartCount.set(totalQty);
        }
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  loadCart() {
    this._cartService.getCart().subscribe({
      next: (res: RetrieveCartResponse) => {
        if (res && res.items) {
          this.cartItems.set(res.items);
          const totalQty = res.items.reduce((s, it) => s + (it.quantity || 0), 0);
          this.cartCount.set(totalQty);
        } else {
          this.cartItems.set([]);
          this.cartCount.set(0);
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        this.cartItems.set([]);
        this.cartCount.set(0);
      }
    });
  }

  clearCart() {
    this._cartService.clearCart().subscribe({
      next: (res) => {
        this.cartItems.set([]);
        this.cartCount.set(0);
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      }
    });
  }

  cartItemSubtotal(item: CartItem): number {
    return (item.price || 0) * (item.quantity || 0);
  }

  cartTotal(): number {
    return this.cartItems().reduce((s, it) => s + this.cartItemSubtotal(it), 0);
  }
}
