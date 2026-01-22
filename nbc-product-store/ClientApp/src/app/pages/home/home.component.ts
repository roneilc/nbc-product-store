import { Component, OnInit, NgZone, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  loading = true;
  error: string | null = null;

  constructor(private _productService: ProductService, private ngZone: NgZone, private appRef: ApplicationRef) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    this._productService.getProducts().subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.ngZone.run(() => {
          if (response.statusCode === "0") {
            this.data = response;
            this.loading = false;
            this.appRef.tick();
          } else {
            this.error = response.statusDescription || 'Failed to load data from RetrieveProductsList';
            this.loading = false;
            this.appRef.tick();
          }
        });
      },
      error: (err) => {
        console.log('error in subscribe:', err);
        this.ngZone.run(() => {
          console.error('Error loading data:', err);
          this.error = 'Failed to load data from Product API';
          this.loading = false;
          this.appRef.tick();
        });
      }
    });
  }
}
