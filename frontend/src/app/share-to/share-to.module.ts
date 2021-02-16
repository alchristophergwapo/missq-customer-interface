import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareToPageRoutingModule } from './share-to-routing.module';

import { ShareToPage } from './share-to.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareToPageRoutingModule
  ],
  declarations: [ShareToPage]
})
export class ShareToPageModule {}
