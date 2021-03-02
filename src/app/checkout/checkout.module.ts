import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ToastrModule.forRoot({maxOpened: 1, timeOut: 2000, closeButton: true}),
  ]
})
export class CheckoutModule { }
