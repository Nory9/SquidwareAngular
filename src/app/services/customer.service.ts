import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.type';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.API_URL}/customers`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.API_URL}/customers/${id}`);
  }

  deleteCustomer(customerId: number): Observable<string> {
    return this.http.delete(`${environment.API_URL}/customers/${customerId}`, { responseType: 'text' });
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(`${environment.API_URL}/customers`, customer,{responseType:'text'});
  }

  updateCustomer(customerId: number, customer: Customer): Observable<any> {
    return this.http.put(`${environment.API_URL}/customers/${customerId}`, customer, { responseType: 'text' });
  }
  
  
}
