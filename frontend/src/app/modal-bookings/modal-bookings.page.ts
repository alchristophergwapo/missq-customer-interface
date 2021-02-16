import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MsqService } from '../services/msq-service.service';
import { ArtisanReviewService } from '../services/artisan-review.service';

@Component({
  selector: 'app-modal-bookings',
  templateUrl: './modal-bookings.page.html',
  styleUrls: ['./modal-bookings.page.scss'],
})
export class ModalBookingsPage implements OnInit {
  @Input() id: string;
  @Input() service_booking: string;
  @Input() updatedAt: string;
  @Input() service_location: string;
  @Input() cost: string;
  @Input() notes: string;
  @Input() status: string;
  bookings: any;
  user: any;
  arrayOfStatus = [];
  // rating: boolean = true;

  constructor(
    private toastCtrl: ToastController,
    private app: AppComponent,
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router,
    private msqService: MsqService,
    private reviewArtisan: ArtisanReviewService,
  ) {

    this.user = this.authService.user;
  }

  // rateArtisan(id, data) {
  //   this.reviewArtisan.review(id, data).subscribe(res => {
  //     console.log(res);

  //   })
  // }

  ngOnInit() {

    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
  }


  closeModal() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/bookings')
  }

  markBookingAsDone(_id) {

    this.msqService.markAsDone(_id).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/bookings')
      }

    })
  }

  rateArtisan(id, data) {
    this.reviewArtisan.review(id, data).subscribe(res => {
      console.log(res);
    })
  }


  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: 'Message!',
      message: 'This feature is under development',
      position: 'top',
      color: 'success',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }


}
