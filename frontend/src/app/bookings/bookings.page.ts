import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import {ModalController} from '@ionic/angular';
import { ModalBookingsPage } from '../modal-bookings/modal-bookings.page';
// import { MatDialog,  MatDialogConfig } from '@angular/material';
import { ArtisanReviewService } from '../api/services/artisan-review.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: any;
  // public table: boolean = true;

  constructor(private authService: AuthService, private reviewArtisan: ArtisanReviewService, private modalController: ModalController) { }
  // constructor(private authService: AuthService, private reviewArtisan: ArtisanReviewService) { }
  rateArtisan(id, data) {
    this.reviewArtisan.review(id, data).subscribe(res => {
      console.log(res);
      
    })
  }

  tagArtisanAsSuki(id){
    this.reviewArtisan.tagAsSuki(id).subscribe(res => {
      console.log(res);
      
    })
  }

  banArtisan(id) {
    this.reviewArtisan.banArtisan(id).subscribe(res => {
      console.log(res);
      
    })
  }

  ngOnInit() {
    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    
  }
  openModal()
  {
    this.modalController.create({component: ModalBookingsPage,cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
      modalElement.present(); 

    })
  }
}
