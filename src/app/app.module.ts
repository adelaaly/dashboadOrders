import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { OrdersOverviewComponent } from './order-overview/order-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderByIdComponent } from './order-by-id/order-by-id.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { CustomerdataComponent } from './customerdata/customerdata.component';
import { ProductDataComponent } from './product-data/product-data.component';
// import { UpdateProductComponent } from './update-product/update-product.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommentManagementComponent } from './comment-management/comment-management.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


export const routes: Routes = []

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopNavbarComponent,
    OrdersOverviewComponent,
    OrderByIdComponent,
    CustomerdataComponent,
    ProductDataComponent,
    // UpdateProductComponent,
    CommentManagementComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzPopconfirmModule,
    NzIconModule,
    NzSelectModule,
    NzListModule,
    NzCommentModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzEmptyModule
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US}, [provideRouter(routes)],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
