import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customer = {
    name: '',
    email: '',
    phone: '',
    vip_status: false,
    favorite_burger: null, 
  };

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(customerForm: NgForm): void {
    if (customerForm.valid) {
      this.customerService.addCustomer(this.customer).subscribe({
        next: () => {
          this.snackBar.open('Customer added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/customers']); 
        },
        error: (err) => {
          console.error('Error adding customer:', err.error);
          this.snackBar.open(err.error || 'Failed to add customer.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
}
