import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-orders-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.css']
})


export class OrdersOverviewComponent implements OnInit {
  orders: Order[] = [];
  

  constructor(private orderService: OrderService, private router: Router) { }
  

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
    //  console.log(data);
      this.orders = data;
    });
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/orders', orderId]);
  }

}
