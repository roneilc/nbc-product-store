import { Component, OnInit, NgZone, ApplicationRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Product Store';
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private _productService: ProductService, private ngZone: NgZone, private appRef: ApplicationRef) {
  }

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
}
