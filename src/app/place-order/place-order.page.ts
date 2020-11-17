import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  
  segmentModel = "nanny";

  latitude: any;
  longitude: any;
  myLocation: any;

  constructor(private geo: Geolocation) { }

  getGeoLocation() {
    this.geo.getCurrentPosition().then((response)=> {
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;
      this.getMyLocation();
    }).catch((error) =>{
      console.log('Error', error);
    });
  }

  getMyLocation() {
    const location = new google.maps.LatLng(this.latitude, this.longitude);
    this.myLocation = location;
  }

  ngOnInit() {
  }

  segmentChanged(event){
  }

}
