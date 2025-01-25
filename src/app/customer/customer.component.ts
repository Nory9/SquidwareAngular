import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { RouterLink } from '@angular/router';
import { Customer } from '../model/customer.type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer',
  imports: [RouterLink,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
  }
}
