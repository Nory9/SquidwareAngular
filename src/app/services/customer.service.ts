import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.type';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomers(): Customer[] {
    return [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', favoriteBurger: 'Cheeseburger' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', favoriteBurger: 'Veggie Burger' },
      { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '555-555-5555', favoriteBurger: 'Chicken Burger' },
    ];
  }
  
}
