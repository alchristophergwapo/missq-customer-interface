import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBookingsPageRoutingModule } from './modal-bookings-routing.module';

import { ModalBookingsPage } from './modal-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBookingsPageRoutingModule
  ],
  declarations: [ModalBookingsPage]
})
export class ModalBookingsPageModule {}
