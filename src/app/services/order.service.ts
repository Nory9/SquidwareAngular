import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.type';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private http: HttpClient) {}

  
  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    console.log(customerId);
    return this.http.get<Order[]>(`${environment.API_URL}/orders/${customerId}`);
  }
}
