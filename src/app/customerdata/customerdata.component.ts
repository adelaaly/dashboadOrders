import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { CustomerDetails } from './CustomerDetails.model';
import { orderById } from '../order-by-id/orderById.model';

@Component({
  selector: 'app-customerdata',
  templateUrl: './customerdata.component.html',
  styleUrls: ['./customerdata.component.css']
})
export class CustomerdataComponent implements OnInit {
  orderId!: string;
  customer!: orderById;
  
  
    constructor(private route: ActivatedRoute, private orderService: OrderService) { }
  
    ngOnInit(): void {
  // OrderByIdComponent
  this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
      this.getOrderDetails();
      console.log('Order ID:', this.orderId)
    }
    
    getOrderDetails(): void {
      this.orderService.getOrderById(this.orderId)
        .subscribe({
          next: (customer: orderById) => {
            this.customer = customer || {} as orderById;
          //  console.log(customer);
          },
          error: (error: any) => {
            console.error(error);
            // Handle error, e.g., display a message to the user
          }
        });
    }
    
  }
