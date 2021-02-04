import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveChatPageRoutingModule } from './live-chat-routing.module';

import {LiveChatPage } from './live-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveChatPageRoutingModule
  ],
  declarations: [LiveChatPage]
})
export class LiveChatPageModule {}
