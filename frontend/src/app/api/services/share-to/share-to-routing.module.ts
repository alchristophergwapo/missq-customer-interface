import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareToPage } from './share-to.page';

const routes: Routes = [
  {
    path: '',
    component: ShareToPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareToPageRoutingModule {}
