import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; 

  constructor(private http: HttpClient) {}

  
  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    console.log(customerId);
    return this.http.get<Order[]>(`${this.apiUrl}/${customerId}`);
  }
}
