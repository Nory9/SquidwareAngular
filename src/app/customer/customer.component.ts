import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Customer } from '../model/customer.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [RouterLink, CommonModule, MatSnackBarModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'], 
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data; 
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      },
    });
  }
  
  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        // Remove the deleted customer from the local list
        this.customers = this.customers.filter(
          (customer) => customer.id !== customerId
        );
  
        // Show success message
        this.snackBar.open('Customer deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'], // Add custom styling (optional)
        });
      },
      error: (err) => {
        console.error('Failed to delete customer:', err);
  
        // Show error message
        this.snackBar.open('Failed to delete customer. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'], // Add custom styling (optional)
        });
      },
    });
  }
  
}
