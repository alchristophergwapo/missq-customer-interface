import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../api/services/auth.service';
import { ArtisanReviewService } from '../api/services/artisan-review.service';

@Component({
  selector: 'app-modal-bookings',
  templateUrl: './modal-bookings.page.html',
  styleUrls: ['./modal-bookings.page.scss'],
})
export class ModalBookingsPage implements OnInit {
  @Input() id : string;
  @Input() service_booking: string;
  @Input() updatedAt: string;
  @Input() service_location: string;
  @Input() cost: string;
  @Input() notes: string;
  @Input() status: string;

  bookings: any;
  user: any;

  // rating: boolean = true;

  constructor(private reviewArtisan: ArtisanReviewService, private authService: AuthService, private modalController: ModalController) { 
    this.user = this.authService.user;
  }

  rateArtisan(id, data) {
    this.reviewArtisan.review(id, data).subscribe(res => {
      console.log(res);

    })
  }

  ngOnInit() 
  {
    // console.log("service ",this.service_booking)

    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    
  }

  closeModal()
  {
    this.modalController.dismiss();
  }

}
