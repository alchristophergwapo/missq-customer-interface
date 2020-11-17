import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSelectPageRoutingModule } from './location-select-routing.module';

import { LocationSelectPage } from './location-select.page';

// import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationSelectPageRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDSnAvHoDuxzpn5ct0U0VYmMFTcs7ODnsg'
    // })
  ],
  declarations: [LocationSelectPage]
})
export class LocationSelectPageModule {}
