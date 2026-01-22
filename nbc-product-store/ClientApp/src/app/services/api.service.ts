import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Example: GET request
  getHome(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home`);
  }

  // Example: GET request with ID
  getHomeData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/${id}`);
  }

  // Example: POST request
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // Example: PUT request
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  // Example: DELETE request
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
