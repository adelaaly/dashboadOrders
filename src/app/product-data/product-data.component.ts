import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { orderById } from '../order-by-id/orderById.model';
//import { OrderDataService } from '../order-data.service';


@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  orderId!: string;
  products!: orderById[];
  cartTotalPrice = 0;
  status: string = '';
  shippingStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private nzMessageService: NzMessageService,
    // private orderDataService: OrderDataService
  ) {}

  // ngOnInit(): void {
  //   this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
  //   this.orderDataService.getOrderData().subscribe((orderData) => {
  //     if (orderData) {
  //       this.products = orderData.orderItems || {} as orderById;
  //       this.cartTotalPrice = orderData.cartTotalPrice || 0;
  //       this.status = orderData.status;
  //       this.shippingStatus = orderData.shippingStatus;
  //     } else {
  //       this.getOrderItems();
  //     }
  //   });
  // }

  ngOnInit(): void {
   this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
  this.getOrderItems();
  }

  getOrderItems(): void {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (orderData: orderById) => {
        this.products = orderData.orderItems || {} as orderById;
        this.status = orderData.status;
        this.shippingStatus = orderData.shippingStatus;
        this.cartTotalPrice = orderData.cartTotalPrice || 0; // Set cartTotalPrice
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  startEdit(product: orderById): void {
    product.edit = true;
  }

  saveEdit(product: orderById): void {
    product.edit = false;

    this.cartTotalPrice = this.products.reduce(
      (total, p) => total + p.quantity * p.price,
      0
    );

    const updatedOrderData = {
      orderId: this.orderId,
      orderItems: this.products.map((updatedProduct) => ({
        productId: updatedProduct.productId,
        quantity: updatedProduct.quantity,
        option: updatedProduct.option,
        price: updatedProduct.price,
        photo: updatedProduct.photo,
        productName: updatedProduct.productName,
        totalPrice: updatedProduct.totalPrice,
      })),
      status: this.status,
      shippingStatus: this.shippingStatus,
    };

    console.log('Updated Order Data:', updatedOrderData);

    this.orderService.updateOrder(this.orderId, updatedOrderData).subscribe({
      next: (result) => {
        console.log('Order updated successfully:', result);
        this.nzMessageService.info('Changes saved successfully');
      },
      error: (error) => {
        console.error('Error updating order:', error);
      },
    });
  }

  confirmSaveEdit(product: orderById): void {
    this.saveEdit(product);
  }

  cancelSaveEdit(product: orderById): void {
    this.nzMessageService.info('Saving edit canceled');
  }

  private refreshPage(): void {
    location.reload();
  }

  //////////////// for cancel Method ////////
  cancelEdit(product: orderById): void {
    product.edit = false;
  }

  confirmCancelEdit(product: orderById): void {
    this.cancelEdit(product);
    this.nzMessageService.info('Canceling edit confirmed');
  }

  confirm(): void {
    this.nzMessageService.info('Click confirm');
  }
}

//   orderId!: string;
//   products: orderById[] = [];
//   cartTotalPrice = 0;

//   constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router, private nzMessageService: NzMessageService) {}

//   ngOnInit(): void {
//     this.orderId = this.route.snapshot.paramMap.get('id') || 'defaultId';
//     this.getOrderItems();
//   }

//   getOrderItems(): void {
//     this.orderService.getOrderById(this.orderId)
//       .subscribe({
//         next: (orderData: any) => {
//           this.products = orderData.orderItems || [];
//           // this.products =  this.products || {} as orderById
          
//           this.cartTotalPrice = orderData.cartTotalPrice || 0; // Set cartTotalPrice
//           console.log( "product======== "+this.products);
//           console.log( "get order items======== "+this.getOrderItems);
//         },
//         error: (error: any) => {
//           console.error(error);
//         }
//       });
//   }

//   startEdit(product: orderById): void {
//     product.edit = true;
//   }

//   saveEdit(product: orderById): void {
//     product.edit = false;

//     this.cartTotalPrice = this.products.reduce((total, p) => total + (p.quantity * p.price), 0);

//     const updatedOrderData = {
//       orderId: this.orderId,
//       orderItems: this.products.map(updatedProduct => ({
//       productId: updatedProduct.productId,
//       quantity: updatedProduct.quantity,
//       option: updatedProduct.option,
//       price: updatedProduct.price,
//       photo: updatedProduct.photo,
//       productName: updatedProduct.productName,
//       totalPrice: updatedProduct.totalPrice,
//       cartTotalPrice: updatedProduct.cartTotalPrice,

//       }))
//     };

//     this.orderService.updateOrder(this.orderId, updatedOrderData)
//       .subscribe({
//         next: (result) => {
//           console.log('Order updated successfully:', result);
//           this.nzMessageService.info('Changes saved successfully');
          
//           // this.refreshPage(); 
//         },
//         error: (error) => {
//           console.error('Error updating order:', error);
//         }
//       });
//   }

//   confirmSaveEdit(product: orderById): void {
//     this.saveEdit(product);
//   }

//   cancelSaveEdit(product: orderById): void {
//     this.nzMessageService.info('Saving edit canceled');
//   }

//   private refreshPage(): void {
//     location.reload();
//    }

//   //////////////// for cancle Methode ////////
//   cancelEdit(product: orderById): void {
//     product.edit = false;
//   }

//   confirmCancelEdit(product: orderById): void {
//     this.cancelEdit(product);
//     this.nzMessageService.info('Canceling edit confirmed');
//   }

//   confirm(): void {
//     this.nzMessageService.info('Click confirm');
//   }
// }
