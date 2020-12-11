import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveChatPage } from './live-chat.page';

const routes: Routes = [
  {
    path: '',
    component: LiveChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveChatPageRoutingModule {}
