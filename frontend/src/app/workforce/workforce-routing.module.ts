import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkforcePage } from './workforce.page';

const routes: Routes = [
  {
    path: '',
    component: WorkforcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkforcePageRoutingModule {}
