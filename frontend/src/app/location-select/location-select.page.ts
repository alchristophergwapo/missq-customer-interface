import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/api/services/auth.service';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { MsqService } from 'src/app/api/services/msq-service.service';

declare var google: any;

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.page.html',
  styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

  @ViewChild("maps", { static: true })
  mapRef: ElementRef;

  latitude: any;
  longitude: any;
  public static lat;
  public static lon;

  myLocation: any;

  data: any;
  service_location: any;
  user: any;

  constructor(
    private geo: Geolocation,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: MsqService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.getGeoLocation();
    this.user = authService.user;
    console.log("On constructor: ",this.user);
    
  }

  getGeoLocation() {
    this.geo.getCurrentPosition()
      .then(response => {
        this.latitude = response.coords.latitude;
        this.longitude = response.coords.longitude;
        this.showMap();
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  showMap() {
    const location = new google.maps.LatLng(this.latitude, this.longitude);
    var map = new google.maps.Map(document.getElementById("maps"), {
      center: location,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener("places_changed", () => {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });

      markers = [];

      var bounds = new google.maps.LatLngBounds();

      places.forEach(function(place) {
        // LocationSelectPage.lat = place.geometry.viewport.Ya.i;
        // LocationSelectPage.lon = place.geometry.viewport.Ua.i;

        if (!place.geometry) {
          console.log("No geometry");
          return;
        }

        markers.push(
          new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          })
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }

  async proceedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Scheduled Date',
      inputs: [
        {
          name: 'schedule',
          type: 'datetime-local',
          cssClass: 'schedule'
        }
      ],
      buttons: [
        {
          text: 'Book now',
          cssClass: 'book-now',
          handler: input => {
            try {
              // this.service_location = <HTMLInputElement>document.getElementById('pac-input').value;
            } catch (error) {
              console.log(error);
              
            }
            
            const datas = {
              service_booking: this.data.service_booking,
              service_location: this.service_location,
              cost: this.data.cost,
              notes: this.data.notes,
              schedule: input.schedule,
              status: "Pending",
              author: this.user
            };

            let pipe = new DatePipe('en-US');
            let date = new Date()
            let todayDate = pipe.transform(date,"YYYY-MM-ddTHH:mm")
            if (todayDate == input.schedule || pipe.transform(input.schedule,"YYYY-MM-dd") < pipe.transform(date,"YYYY-MM-dd")) {
              true
            } else {
              this.bookServiceNow(datas);
            }
          }
        }
      ]
    })

    await alert.present();
  }

  bookServiceNow(serviceData) {
    this.service.bookNow(serviceData).subscribe(response => {
      console.log("Response",response);
      if (response) {
        this.router.navigateByUrl('/place-order');
      }
    });
  }

  ngOnInit() {
    this.service_location = "";
    this.activatedRoute.queryParams.subscribe(params => {
      this.data = JSON.parse(params.bookedData);
    });

    
    this.user = this.authService.user;
    
    
  }

}