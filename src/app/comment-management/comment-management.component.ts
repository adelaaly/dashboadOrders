import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { orderById } from '../order-by-id/orderById.model';
import { OrderDataService } from '../order-data.service';


@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrls: ['./comment-management.component.css']
})
export class CommentManagementComponent implements OnInit {
  orderId!: string;
  comment!: orderById;
  editingComment: boolean = false;
  editedComment: any = '';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private orderDataService: OrderDataService) {}

ngOnInit(): void {
this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
this.orderDataService.getOrderData().subscribe((orderData) => {
if (!orderData) {
  this.getOrderDetails();
 } else {
 this.comment = orderData;
 }
});
}

  getOrderDetails(): void {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (comment: orderById) => {
        this.comment = comment || {} as orderById;
      },
      error: (error: any) => {
        console.error(error);
        // Handle error, e.g., display a message to the user
      },
    });
  }

  editComment() {
    this.editingComment = true;
    this.editedComment = this.comment.comments;
  }

  handleSubmit() {
    const updatedComments: orderById = {
      comments: this.editedComment,
      id: this.comment.id,
      orderDate: this.comment.orderDate,
      customerFirstName: this.comment.customerFirstName,
      customerLastName: this.comment.customerLastName,
      orderItems: this.comment.orderItems,
      cartTotalPrice: this.comment.cartTotalPrice,
      adress: this.comment.adress,
      phone: this.comment.phone,
      customerId: this.comment.customerId,
      status: this.comment.status,
      shippingStatus: this.comment.shippingStatus,
      productId: this.comment.productId,
      photo: this.comment.photo,
      productName: this.comment.productName,
      price: this.comment.price,
      option: this.comment.option,
      quantity: this.comment.quantity,
      totalPrice: this.comment.totalPrice,
      comment: this.comment.comment,
    };

    this.orderService.updateOrder(this.orderId, updatedComments).subscribe(
      (response) => {
        console.log('Comment updated successfully:', response);
        this.comment.comments = this.editedComment;
        // this.orderDataService.updateOrderData(updatedComments);
        this.editingComment = false;
      },
      (error) => {
        console.error('Error updating comment:', error);
      }
    );
  }
}
