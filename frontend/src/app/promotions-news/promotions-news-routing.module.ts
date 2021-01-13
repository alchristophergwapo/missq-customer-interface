import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionsNewsPage } from './promotions-news.page';

const routes: Routes = [
  {
    path: '',
    component: PromotionsNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsNewsPageRoutingModule {}
