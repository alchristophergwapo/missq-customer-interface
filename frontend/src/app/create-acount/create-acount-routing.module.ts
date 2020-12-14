import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAcountPage } from './create-acount.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAcountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAcountPageRoutingModule {}
