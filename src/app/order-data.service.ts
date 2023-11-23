import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderById } from './order-by-id/orderById.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {


  private orderDataSubject = new BehaviorSubject<orderById | null>(null);
  orderData$ = this.orderDataSubject.asObservable();


  updateOrderData(updatedOrderData$: Observable<orderById>): void {
    updatedOrderData$.subscribe((orderData) => {
      this.orderDataSubject.next(orderData);
    });
  }
  

  getOrderData(): Observable<orderById | null> {
    return this.orderData$;
  }

}
