import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkforcePageRoutingModule } from './workforce-routing.module';

import { WorkforcePage } from './workforce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkforcePageRoutingModule
  ],
  declarations: [WorkforcePage]
})
export class WorkforcePageModule {}
