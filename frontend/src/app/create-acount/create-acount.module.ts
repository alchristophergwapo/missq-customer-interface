import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAcountPageRoutingModule } from './create-acount-routing.module';

import { CreateAcountPage } from './create-acount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAcountPageRoutingModule
  ],
  declarations: [CreateAcountPage]
})
export class CreateAcountPageModule {}
