import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { RetrieveProductsListResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    readonly RETRIEVE_PRODUCT_LIST = `/api/Products/RetrieveProductsList`;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get products list
  getProducts(): Observable<RetrieveProductsListResponse> {
    return this.http.get<RetrieveProductsListResponse>(`${this.apiUrl}${this.RETRIEVE_PRODUCT_LIST}`);
  }
}
