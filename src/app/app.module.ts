import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfirmedValidatorDirective } from './confirmed-validators.directive'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ValidateEqualModule } from 'ng-validate-equal';

import { ServicesService } from './services.service';
import { HttpClientModule } from '@angular/common/http';

// import { CountryCodeSelectComponent } from './country-code-select.component'
// import { FilterPipe } from './filter.pipe';
// import { ComparePasswordDirective } from './directive/compare-directive/compare-password.directive';

@NgModule({
  declarations: [AppComponent, ConfirmedValidatorDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    HttpClientModule,
  ],
  providers: [
    ServicesService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
