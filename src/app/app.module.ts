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

import { IonicStorageModule } from '@ionic/storage';

import { AuthGuardService as AuthGuard } from "./api/services/auth_guard/auth-guard.service";
import { AuthService } from "./api/services/auth/auth.service";
import { PlaceOrderPage } from "./place-order/place-order.page";
import { MsqService } from './api/services/service/msq-service.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
