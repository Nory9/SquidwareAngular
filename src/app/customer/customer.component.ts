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
  paginatedCustomers: Customer[] = []; 
  currentPage: number = 1; 
  pageSize: number = 5;
  totalPages: number = 0; 

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

 
  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.totalPages = Math.ceil(this.customers.length / this.pageSize);
        this.updatePaginatedCustomers();
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.snackBar.open('Failed to load customers. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

 
  updatePaginatedCustomers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCustomers = this.customers.slice(startIndex, endIndex);
  }

 
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCustomers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCustomers();
    }
  }

  
  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter(
          (customer) => customer.id !== customerId
        );
        this.totalPages = Math.ceil(this.customers.length / this.pageSize);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        this.updatePaginatedCustomers();

        this.snackBar.open('Customer deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Failed to delete customer:', err);

        this.snackBar.open('Failed to delete customer. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
