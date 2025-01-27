import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customer?: Customer;
  editMode: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
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
    this.editMode = !this.editMode; 
  }

  saveChanges(): void {
    if (!this.customer) {
      return;
    }
  
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.customer.email)) {
      this.snackBar.open('Invalid email format. Please enter a valid email.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }
  
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(this.customer.phone)) {
      this.snackBar.open('Invalid phone number. Please enter a 10-digit phone number.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }
  
   
    this.customerService.updateCustomer(this.customer.id, this.customer).subscribe({
      next: (message) => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
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
  
  goBackToCustomers(): void {
    this.router.navigate(['/']);
  }

  viewOrders(): void {
    if (this.customer) {
      console.log('Navigate to orders for:', this.customer.id);
    }
  }
}
