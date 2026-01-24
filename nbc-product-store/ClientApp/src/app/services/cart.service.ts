import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { getApiUrl } from '../backend-config';
import { CartRequest, RetrieveCartResponse } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly ADD_ITEM = `/api/Cart/AddItem`;
  readonly GET_CART = `/api/Cart/GetCart`;
  readonly CLEAR_CART = `/api/Cart/ClearCart`;

  private apiUrl = getApiUrl();

  constructor(private http: HttpClient) { }

  //Add item to cart
  addItem(request: CartRequest): Observable<RetrieveCartResponse> {
    return this.http.post<RetrieveCartResponse>(`${this.apiUrl}${this.ADD_ITEM}`, request);
  }

  //Retrieve all current cart items
  getCart(): Observable<RetrieveCartResponse> {
    return this.http.get<RetrieveCartResponse>(`${this.apiUrl}${this.GET_CART}`);
  }

  //Clear all items from cart
  clearCart(): Observable<RetrieveCartResponse> {
    return this.http.delete<RetrieveCartResponse>(`${this.apiUrl}${this.CLEAR_CART}`);
  }
}
