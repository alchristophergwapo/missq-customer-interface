import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app-location-select',
    templateUrl: './location-select.page.html',
    styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

    latitude: number;
    longitude: number;
    zoom: number;
    location: string;
    private geoCoder;

    @ViewChild('search', { static: false })
    public searchElementRef: ElementRef;

    constructor(
        public mapsAPILoader: MapsAPILoader,
        public ngZone: NgZone
    ) {

    }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();

            this.geoCoder = new google.maps.Geocoder;

            let autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });

            autoComplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autoComplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            })
        });
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 8;
                this.getAddress(this.latitude, this.longitude);
            });
        }
    };

    markerDragEnd($event: any) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
    }

    getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
            if (status = 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.location = results[0].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }


}
