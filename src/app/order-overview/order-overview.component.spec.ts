import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOverviewComponent } from './order-overview.component';

describe('OrderOverviewComponent', () => {
  let component: OrdersOverviewComponent;
  let fixture: ComponentFixture<OrdersOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersOverviewComponent]
    });
    fixture = TestBed.createComponent(OrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
