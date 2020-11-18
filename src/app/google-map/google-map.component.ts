import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @ViewChild("map", {static: false}) mapElement: ElementRef;

  map: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    let coords = new google.maps.LatLng(40,100);

    let mapOtions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOtions);

  }

}
