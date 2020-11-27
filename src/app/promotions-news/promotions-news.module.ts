import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionsNewsPageRoutingModule } from './promotions-news-routing.module';

import { PromotionsNewsPage } from './promotions-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionsNewsPageRoutingModule
  ],
  declarations: [PromotionsNewsPage]
})
export class PromotionsNewsPageModule {}
