import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { orderById } from './orderById.model';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { OrderDataService } from '../order-data.service';


@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.css']
})


export class OrderByIdComponent implements OnInit {
  orderId!: string;
  order!: orderById;
  editMode = false;
  updatedStatus = '';
  updatedShipping = '';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private nzMessageService: NzMessageService,
              // private orderDataService: OrderDataService
              ) {}


// ngOnInit(): void {
//   this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
//   this.orderDataService.getOrderData().subscribe((orderData) => {
//  if (!orderData) {
//   this.getOrderDetails();
//  } else {
//   this.order = orderData;
//   }
//  });
// }

ngOnInit(): void {
  //OrderByIdComponent
  this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
      this.getOrderDetails();
      console.log('Order ID:', this.orderId)
    }


  getOrderDetails(): void {
    console.log('Getting order details...');
    this.orderService.getOrderById(this.orderId)
      .subscribe({
        next: (order: orderById) => {
          this.order = order || {} as orderById;
          console.log('Order details:', this.order);
        },
        error: (error: any) => {
          console.error('Error getting order details:', error);
        }
      });
  }


  editOrder(): void {
    this.editMode = true;
    this.updatedStatus = this.order.status;
    this.updatedShipping = this.order.shippingStatus;
  }

  saveOrder(): void {
    this.editMode = false;
    const updatedOrderData = {
      id: this.order.id,
      orderDate: this.order.orderDate,
      customerFirstName: this.order.customerFirstName,
      customerLastName: this.order.customerLastName,
      orderItems: this.order.orderItems,
      cartTotalPrice: this.order.cartTotalPrice,
      adress: this.order.adress,
      phone: this.order.phone,
      customerId: this.order.customerId,
      comments: this.order.comments,
      status: this.updatedStatus,
      shippingStatus: this.updatedShipping
    };

    console.log('Saving order:', updatedOrderData);
    
    this.orderService.updateOrder(this.orderId, updatedOrderData)
    .subscribe({
      next: (result) => {
        if (result) {
          // console.log('Order updated successfully:', result);
          // console.log("============" + updatedOrderData)
          this.nzMessageService.info('Changes saved successfully');
          this.getOrderDetails();  
          
        } else {
          console.log('Order updated successfully, but no response body.');
          // Handle this case as needed
        }
      },
      error: (error) => {
        console.error('Error updating order:', error);
      }
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.nzMessageService.info('Edit canceled');
  }

  confirmSaveEdit(): void {
    this.saveOrder();
  }


















 /*
  orderId!: string;
order!: orderById;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
//OrderByIdComponent
this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
    this.getOrderDetails();
    console.log('Order ID:', this.orderId)
  }
  
  getOrderDetails(): void {
    this.orderService.getOrderById(this.orderId)
      .subscribe({
        next: (order: orderById) => {
          this.order = order || {} as orderById;
          console.log(order);
        },
        error: (error: any) => {
          console.error(error);
          // Handle error, e.g., display a message to the user
        }
      });
  }
  */
}