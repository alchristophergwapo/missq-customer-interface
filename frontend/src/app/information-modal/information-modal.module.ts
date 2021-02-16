import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationModalPageRoutingModule } from './information-modal-routing.module';

import { InformationModalPage } from './information-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationModalPageRoutingModule
  ],
  declarations: [InformationModalPage]
})
export class InformationModalPageModule {}
