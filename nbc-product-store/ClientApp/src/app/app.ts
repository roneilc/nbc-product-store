import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFlyoutComponent } from './components/cart-flyout/cart-flyout.component';
import { ProductsPageComponent } from './pages/products-page.component';
import { CartStateService } from './services/cart-state.service';
import { setSelectedBackend } from './backend-config';
import { environment } from './environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CartFlyoutComponent, ProductsPageComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  protected title = 'Product Store';
  showCart = signal<boolean>(false);
  currentBackend = signal<string>('dotnet');
  availableBackends: string[] = [];
  private _docClickListener: ((ev: MouseEvent) => void) | null = null;
  private _docKeyListener: ((ev: KeyboardEvent) => void) | null = null;

  constructor(public cartState: CartStateService) {
    this.availableBackends = Object.keys(environment.backends || { dotnet: '', java: '' });
    try {
      const selected = (typeof localStorage !== 'undefined') ? localStorage.getItem('selectedBackend') : null;
      this.currentBackend.set(selected || environment.defaultBackend || this.availableBackends[0] || 'dotnet');
    } catch (e) {
      this.currentBackend.set(environment.defaultBackend || 'dotnet');
    }
  }

  ngOnInit() {
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
      this.cartState.loadCart();
    }
  }

  onClearCart() {
    this.cartState.clearCart();
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
}
