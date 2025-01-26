import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order.type';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-order-details',
  imports:[CommonModule,RouterLink],
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.css'],
})
export class CustomerOrderDetailsComponent implements OnInit {
  @Input() customerId!: number; // Expect customerId to be passed as input
  orders: Order[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private orderService: OrderService,private router: Router) {}

  ngOnInit(): void {
    // Retrieve customerId from the route
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Customer ID:', this.customerId);

    if (this.customerId) {
      this.fetchOrders();
    } else {
      console.error('Invalid Customer ID.');
      this.isLoading = false;
    }
  }

  parseItems(products: string): string[] {
    return products.split(',');
  }
  
  // Fetch orders for the given customer
  fetchOrders(): void {
    this.orderService.getOrdersByCustomerId(this.customerId).subscribe({
      next: (data: Order[]) => {
        console.log(data)
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/customer-profile', this.customerId]);
  }
}
