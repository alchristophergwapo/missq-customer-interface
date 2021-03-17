import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProceedJobOrderPageRoutingModule } from './proceed-job-order-routing.module';

import { ProceedJobOrderPage } from './proceed-job-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProceedJobOrderPageRoutingModule
  ],
  declarations: [ProceedJobOrderPage]
})
export class ProceedJobOrderPageModule {}
