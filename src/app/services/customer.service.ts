import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.type';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers'; 

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  deleteCustomer(customerId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${customerId}`, { responseType: 'text' });
  }

  updateCustomer(customerId: number, customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customerId}`, customer, { responseType: 'text' });
  }
  
  
}
