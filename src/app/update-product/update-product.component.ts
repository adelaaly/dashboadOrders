import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productData } from '../product-data/productData.model';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormRecord, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  orderId!: string;
  products: productData[] = [];

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) {}

 ngOnInit(): void {
  this.orderId = this.route.snapshot.params['orderId'];
  this.getOrderItems();
}

  getOrderItems(): void {
    this.orderService.getOrderItems(this.orderId)
      .subscribe({
        next: (orderData: any) => {
          this.products = orderData.orderItems || [];
          console.log(this.products);
        },
        error: (error: any) => {
          console.error(error);
          // Handle error, e.g., display a message to the user
        }
      });
  }

  updateOrder(): void {
    const updatedOrderData = {
        orderId: this.orderId,
        orderItems: this.products.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        option: product.option,
        price: product.price,
        photo: product.photo,
        productName: product.productName,
        totalPrice: product.totalPrice,
        comment: product.comment,
       // customerFirstName: product.customerFirstName
     //   cartTotalPrice: product.cartTotalPrice
       // adress: product.adress
       // shippingStatus: product.shippingStatus
       // status: product.status
        
      }))
    };

    this.orderService.updateOrder(this.orderId, updatedOrderData)
      .subscribe({
        next: (result) => {
          console.log('Order updated successfully:', result);
          this.router.navigate(['/orders', this.orderId]);
          this.displaySuccessMessage('Order updated successfully!');
        },
        error: (error) => {
          console.error('Error updating order:', error);
          this.displayErrorMessage('Failed to update the order. Please try again.');
        }
      });
  }

  displaySuccessMessage(message: string): void {
    alert(message);
  }

  displayErrorMessage(message: string): void {
    alert(message);
  }

  }






