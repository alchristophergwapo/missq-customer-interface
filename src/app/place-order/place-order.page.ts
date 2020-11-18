import { Component, OnInit, NgZone } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from "@ionic-native/native-geocoder/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  
  segmentModel = "nanny";

  userLocation;
  userCity;
  lat;
  lng;
  location;
  latLngResult;
  userLocationFromLatLng;

  constructor(private geo: Geolocation, private geoCoder: NativeGeocoder, private platform: Platform, public zone: NgZone) { 
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getMyLocation();
    });
  }

  getMyLocation() {
    this.geo.getCurrentPosition().then((response)=> {

    }).catch((error) =>{
      console.log('Error', error);
    });
    
  }

  // async getGeoLocation(lat: number, lng: number, type?) {
  //   let geocoder = await new google.maps.Geocoder();
  //   let latlng = await new google.maps.LatLng(lat, lng);
  //   let request = {latLng: latlng};

  //   await geocoder.geocode(request, (results, status) => {
  //     if (status = google.maps.GeocoderStatus.OK) {
  //       let result = results[0];
  //       this.zone.run(() => {
  //         if (result != null) {
  //           this.userCity = result.formatted_address;
  //           if (type === 'reverseGeocode') {
  //             this.latLngResult = result.formatted_address;
  //           }
  //         }
  //       })

  //     }
  //   });
  // }

  // reverseGeocode(lat, lng) {
  //   if (this.platform.is('cordova')) {
  //     let options: NativeGeocoderOptions = {
  //       useLocale: true,
  //       maxResults: 5
  //     };
  //     this.geoCoder.reverseGeocode(lat, lng, options)
  //       .then((result: NativeGeocoderResult[]) => this.userLocationFromLatLng = result[0])
  //       .catch((error: any) => console.log(error));
  //   } else {
  //     this.getGeoLocation(lat, lng, 'reverseGeocode');
  //   }
  // }

  ngOnInit() {
  }

  segmentChanged(event){
  }

}
