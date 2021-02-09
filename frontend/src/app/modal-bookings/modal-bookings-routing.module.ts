import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBookingsPage } from './modal-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBookingsPageRoutingModule {}
