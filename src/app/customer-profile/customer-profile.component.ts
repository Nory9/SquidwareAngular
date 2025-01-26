import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  imports:[CommonModule,FormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customer?: Customer;
  editMode: boolean = false; // Flag to toggle edit mode

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe({
        next: (data) => {
          this.customer = data;
        },
        error: (err) => {
          console.error('Error fetching customer:', err);
          this.snackBar.open('Failed to load customer profile.', 'Close', { duration: 3000 });
        },
      });
    } else {
      this.snackBar.open('Invalid customer ID.', 'Close', { duration: 3000 });
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode; // Toggle edit mode
  }

  saveChanges(): void {
    if (this.customer) {
      this.customerService.updateCustomer(this.customer.id, this.customer).subscribe({
        next: (message) => {
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.editMode = false;
        },
        error: (err) => {
          if (err.status === 409) {
            this.snackBar.open(err.error || 'Email is already in use. Please try another.', 'Close', {
              duration: 5000,
              panelClass: 'error-snackbar',
            });
          } else {
            console.error('Error updating customer:', err);
            this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
              duration: 3000,
              panelClass: 'error-snackbar',
            });
          }
        },
      });
    }
  }
  

  viewOrders(): void {
    if (this.customer) {
      console.log('Navigate to orders for:', this.customer.id);
    }
  }
}
