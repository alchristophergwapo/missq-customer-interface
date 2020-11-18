import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSelectPageRoutingModule } from './location-select-routing.module';

import { LocationSelectPage } from './location-select.page';

import { GoogleMapComponent } from "../google-map/google-map.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationSelectPageRoutingModule,
  ],
  declarations: [LocationSelectPage,
    GoogleMapComponent]
})
export class LocationSelectPageModule {}
