import { Component, OnInit, OnDestroy, NgZone, ApplicationRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { Product } from './models/product.model';
import { CartItem, RetrieveCartResponse } from './models/cart.model';
import { setSelectedBackend } from './backend-config';
import { environment } from './environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'Product Store';
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  cartCount = signal<number>(0);
  showCart = signal<boolean>(false);
  cartItems = signal<CartItem[]>([]);
  currentBackend = signal<string>('dotnet');
  availableBackends: string[] = [];
  private _docClickListener: ((ev: MouseEvent) => void) | null = null;
  private _docKeyListener: ((ev: KeyboardEvent) => void) | null = null;

  constructor(private _productService: ProductService, private _cartService: CartService, private ngZone: NgZone, private appRef: ApplicationRef) {
    this.availableBackends = Object.keys(environment.backends || { dotnet: '', java: '' });
    try {
      const selected = (typeof localStorage !== 'undefined') ? localStorage.getItem('selectedBackend') : null;
      this.currentBackend.set(selected || environment.defaultBackend || this.availableBackends[0] || 'dotnet');
    } catch (e) {
      this.currentBackend.set(environment.defaultBackend || 'dotnet');
    }
  }

  ngOnInit() {
    this.loadProducts();
    if (typeof window !== 'undefined') {
      this._docClickListener = (e: MouseEvent) => this._onDocumentClick(e);
      this._docKeyListener = (e: KeyboardEvent) => this._onDocumentKeydown(e);
      document.addEventListener('click', this._docClickListener);
      document.addEventListener('keydown', this._docKeyListener);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      if (this._docClickListener) document.removeEventListener('click', this._docClickListener);
      if (this._docKeyListener) document.removeEventListener('keydown', this._docKeyListener);
    }
  }


  private _onDocumentClick(ev: MouseEvent) {
    if (!this.showCart()) return;
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    if (target.closest && (target.closest('.cart-flyout') || target.closest('.cart-button'))) return;
    this.showCart.set(false);
  }

  private _onDocumentKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && this.showCart()) {
      this.showCart.set(false);
    }
  }

  toggleCartFlyout(ev?: Event) {
    ev?.stopPropagation();
    const willShow = !this.showCart();
    this.showCart.set(willShow);
    if (willShow) {
      this.loadCartItems();
    }
  }

  loadCartItems() {
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
      }
    });
  }

  cartItemSubtotal(item: CartItem) {
    return (item.price || 0) * (item.quantity || 0);
  }

  cartTotal() {
    return this.cartItems().reduce((s, it) => s + this.cartItemSubtotal(it), 0);
  }

  setBackend(key: string) {
    try {
      setSelectedBackend(key);
      this.currentBackend.set(key);
    } catch (e) {
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  toggleBackend() {
    const idx = this.availableBackends.indexOf(this.currentBackend());
    const next = this.availableBackends[(idx + 1) % this.availableBackends.length];
    this.setBackend(next);
  }

  loadProducts() {
    console.log('loadProducts call');
    this.loading.set(true);
    this.error.set(null);
    this._productService.getProducts().subscribe({
      next: (response) => {
        console.log('Received response:', response);
        if (response.statusCode === "0") {
          this.products.set(response.products || []);
          this.loading.set(false);
          console.log('Products:', this.products());
        } else {
          this.error.set('Unable to load products');
          this.loading.set(false);
        }
      },
      error: (err) => {
        console.log('Error in subscribe:', err);
        this.error.set('Unable to load products');
        this.loading.set(false);
        console.error('Error loading products:', err);
      }
    });
  }

  addToCart(product: Product) {
    const payload = { productId: product.id, quantity: 1 };
    this._cartService.addItem(payload).subscribe({
      next: (res) => {
        if (res && res.items) {
          const totalQty = res.items.reduce((s, it) => s + (it.quantity || 0), 0);
          this.cartCount.set(totalQty);
          if (this.showCart()) {
            this.loadCartItems();
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
