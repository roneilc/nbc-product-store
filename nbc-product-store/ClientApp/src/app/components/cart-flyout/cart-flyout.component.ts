import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-flyout',
  templateUrl: './cart-flyout.component.html',
  styleUrls: ['./cart-flyout.component.css'],
  imports: [CommonModule],
})
export class CartFlyoutComponent {
  @Input() showCart: boolean = false;
  @Input() cartItems: CartItem[] = [];
  @Input() cartCount: number = 0;
  @Input() cartTotal: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() clearCart = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onClearCart() {
    this.clearCart.emit();
  }
}
