import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GcashPaymentInfoPage } from './gcash-payment-info.page';

const routes: Routes = [
  {
    path: '',
    component: GcashPaymentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GcashPaymentInfoPageRoutingModule {}
