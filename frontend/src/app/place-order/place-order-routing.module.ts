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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceOrderPageRoutingModule {}
