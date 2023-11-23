import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Order } from './order-overview/order.model';
import { orderById } from './order-by-id/orderById.model';
import { CustomerDetails } from './customerdata/CustomerDetails.model';
import { productData } from './product-data/productData.model';
// import { commentNew } from './comment-management/Comment.Model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  //apiUrl holds the base URL of the Spring Boot API. 
  private apiUrl = 'http://localhost:8090/v1/orders'; 
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjk5NjA2NDM3LCJleHAiOjE3MDIxOTg0MzcsInJvbGUiOlsiYWRtaW4iLCJtYW5hZ2VyIl19.LQAOsalhBR5bKB0tbbiruBtU5or4G5qPWgTavtNbfSM';
  
headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);


  //The HttpClient instance is injected into the constructor,
  //allowing the service to make HTTP requests.
  constructor(private http: HttpClient) { }

  //observable is a powerful data handling mechanism. It is used for handling
  //asynchronous operations and handling events
  //represents an observable that emits an array of Order objects
  //means you have an observable stream that emits arrays of Order objects. I


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`, { headers : this.headers } ).pipe(
      catchError((error: any) => {
        console.error('Error fetching orders:', error);
        throw error;
      })
    );
  }


  getOrderItems(orderId: string): Observable<{ products: productData[]}> {
    return this.http.get<{ products: productData[]}>(`${this.apiUrl}/${orderId}`, { headers: this.headers });
  }
  

  getOrderById(orderId: string): Observable<orderById> {
    return this.http.get<orderById>(`${this.apiUrl}/${orderId}`, { headers: this.headers });
  }
   


updateOrder(orderId: string, updatedOrder: any): Observable<{ products: orderById[] }> {
  return this.http.put<any>(`${this.apiUrl}/${orderId}`, updatedOrder, { headers: this.headers })
  .pipe(
    catchError(error => {
      console.error('Error updating order:', error);
      throw error;
    })
  );
  ;
}



}

