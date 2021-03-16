import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ModalBookingsPage } from '../modal-bookings/modal-bookings.page';

// import { ModalRatingsPage } from '../modal-ratings/modal-ratings.page';
// import { MatDialog,  MatDialogConfig } from '@angular/material';
import { ArtisanReviewService } from '../services/artisan-review.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  pending = 'Pending';
  ongoing = 'Ongoing';
  completed = 'Completed';
  bookings: any;
  user: any;
  arryOfStatus = [];
  // arryOfStatusOngoing = [];
  // arryOfStatusCompleted = [];
  // public table: boolean = true;

  constructor(
    private app: AppComponent, private authService: AuthService, private reviewArtisan: ArtisanReviewService, private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.user = this.app.user;
  }

  async ngOnInit() {
    const userBookings = this.authService.user;

    this.bookings = await userBookings['bookings']
    this.arryOfStatus = this.bookings.filter(bookings => bookings.status == "Pending");

  }
  // constructor(private authService: AuthService, private reviewArtisan: ArtisanReviewService) { }

  tagArtisanAsSuki(id) {
    this.reviewArtisan.tagAsSuki(id).subscribe(res => {
      console.log(res);

    })
  }

  banArtisan(id) {
    this.reviewArtisan.banArtisan(id).subscribe(res => {
      console.log(res);

    })
  }

  //Filtered by Status PENDING
  async filteredByPending() {
    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   duration: 2000
    // });
    // await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
    this.authService.filteredOngoing({ status: "Pending", author: this.user }).subscribe(res => {
      this.presentLoading();
      console.log(res);
      this.arryOfStatus = res.data;
    })

  }

  ///Filtered by Status ONGOING
  async filteredByOngoing() {
    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   duration: 2000
    // });
    // await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.authService.filteredOngoing({ status: "Ongoing", author: this.user }).subscribe(res => {
      this.presentLoading();
      console.log(res);
      this.arryOfStatus = res.data;
    })
  }



  // //Filtered by Status COMPLETED
  async filteredByCompleted() {
    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   duration: 2000
    // });
    // await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
    this.authService.filteredOngoing({ status: "Completed", author: this.user }).subscribe(res => {
      this.presentLoading();
      console.log(res);
      this.arryOfStatus = res.data;
    })
  }

  async passToOrders(b) {
    const modal = await this.modalController.create({
      component: ModalBookingsPage,
      componentProps: {
        status: b.status, id: b._id, service_booking: b.service_booking,
        updatedAt: b.updatedAt, service_location: b.service_location,
        cost: b.cost, notes: b.notes,
        schedule: b.schedule,
      },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    modal.present();
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

