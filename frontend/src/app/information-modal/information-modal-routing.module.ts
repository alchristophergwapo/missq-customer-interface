import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationModalPage } from './information-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InformationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationModalPageRoutingModule {}
