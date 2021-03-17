import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GcashPaymentInfoPageRoutingModule } from './gcash-payment-info-routing.module';

import { GcashPaymentInfoPage } from './gcash-payment-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GcashPaymentInfoPageRoutingModule
  ],
  declarations: [GcashPaymentInfoPage]
})
export class GcashPaymentInfoPageModule {}
