import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { MsqService } from 'src/app/services/msq-service.service';
import { AuthService } from 'src/app/services/auth.service';

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

  data: any;
  public service_location: any;
  user: any;

  constructor(
    private geo: Geolocation,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: MsqService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.getGeoLocation();
    this.user = authService.user;
    this.service_location = "";

  }

  ngOnInit() {
    this.service_location = "";
    this.activatedRoute.queryParams.subscribe(params => {
      this.data = JSON.parse(params.bookedData);
    });


    this.user = this.authService.user;


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

    var selected_place = '';

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

      markers.forEach(function (marker) {
        marker.setMap(null);
      });

      markers = [];

      var bounds = new google.maps.LatLngBounds();

      places.forEach(function (place) {
        // LocationSelectPage.lat = place.geometry.viewport.Ya.i;
        // LocationSelectPage.lon = place.geometry.viewport.Ua.i;
        selected_place = place.name + ", " + place.formatted_address;

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

      this.setServiceLocation(selected_place);

      map.fitBounds(bounds);
    });
  }

  setServiceLocation(loc) {
    this.service_location = loc;
    console.log(this.service_location);

  }

  async proceedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Scheduled Date',
      backdropDismiss: false,
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
            let todayDate = pipe.transform(date, "YYYY-MM-ddTHH:mm")
            if (todayDate == input.schedule || pipe.transform(input.schedule, "YYYY-MM-dd") < pipe.transform(date, "YYYY-MM-dd")) {
              this.presentErrorToast();
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
    console.log(serviceData);

    this.service.bookNow(serviceData).subscribe(async response => {
      await this.presentLoading();
      if (response) {
        this.router.navigateByUrl('/place-order');
      }
    });
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      header: 'Error Message!',
      message: 'Date of service must be the day after today.',
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            this.proceedAlert();
          }
        }
      ]
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}