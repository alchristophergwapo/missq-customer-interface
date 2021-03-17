import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceedJobOrderPage } from './proceed-job-order.page';

const routes: Routes = [
  {
    path: '',
    component: ProceedJobOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceedJobOrderPageRoutingModule {}
