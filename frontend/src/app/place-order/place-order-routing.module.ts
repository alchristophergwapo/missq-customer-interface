import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceOrderPage } from './place-order.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceOrderPage
  },
  {
    path: 'location-select',
    loadChildren: () => import('./location-select/location-select.module').then( m => m.LocationSelectPageModule)
  },  {
    path: 'proceed-job-order',
    loadChildren: () => import('./proceed-job-order/proceed-job-order.module').then( m => m.ProceedJobOrderPageModule)
  },
  {
    path: 'gcash-payment-info',
    loadChildren: () => import('./gcash-payment-info/gcash-payment-info.module').then( m => m.GcashPaymentInfoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceOrderPageRoutingModule {}
