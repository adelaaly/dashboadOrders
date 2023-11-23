import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderByIdComponent } from './order-by-id/order-by-id.component';
import { OrdersOverviewComponent } from './order-overview/order-overview.component';
import { CustomerdataComponent } from './customerdata/customerdata.component';
// import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDataComponent } from './product-data/product-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersOverviewComponent },
  { path: 'orders/:id', component: OrderByIdComponent },
  { path: 'orders/:id', component: CustomerdataComponent },
  // { path: 'update-order/:orderId', component: UpdateProductComponent },
  { path: 'product-data/:orderId', component: ProductDataComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
