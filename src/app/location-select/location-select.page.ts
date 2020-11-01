import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
    selector: 'app-location-select',
    templateUrl: './location-select.page.html',
    styleUrls: ['./location-select.page.scss'],
})
export class LocationSelectPage implements OnInit {

    @ViewChild('search', { static: false })
    public searchElementRef: ElementRef;

    constructor(
        
    ) {

    }

    ngOnInit() {
        
    };

    markerDragEnd() {
       
    }

    getAddress() {
        
    }


}
