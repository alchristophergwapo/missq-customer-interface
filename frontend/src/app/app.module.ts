import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ValidateEqualModule } from 'ng-validate-equal';

import { ServicesService } from './services.service';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { AuthGuardService as AuthGuard } from "./api/services/auth-guard.service";
import { AuthService } from "./api/services/auth.service";
import { PlaceOrderPage } from "./place-order/place-order.page";
import { MsqService } from './api/services/msq-service.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ValidateEqualModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    ServicesService,
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    AuthGuard,
    AuthService,
    MsqService,
    PlaceOrderPage,
    AppComponent,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
