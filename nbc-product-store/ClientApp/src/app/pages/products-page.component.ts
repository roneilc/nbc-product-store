import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ProductService } from '../services/product.service';
import { CartStateService } from '../services/cart-state.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private _productService: ProductService,
    private _cartState: CartStateService
  ) {}

  ngOnInit() {
    this.loadProducts();
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
    this._cartState.addToCart(product.id, 1);
  }
}
