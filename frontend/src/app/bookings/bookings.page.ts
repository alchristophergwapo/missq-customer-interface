import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ModalBookingsPage } from '../modal-bookings/modal-bookings.page';
// import { MatDialog,  MatDialogConfig } from '@angular/material';
import { ArtisanReviewService } from '../api/services/artisan-review.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  pending='Pending';
  ongoing='Ongoing';
  completed='Completed';
  bookings: any;
  user: any;
  arryOfStatus = [];
  // arryOfStatusOngoing = [];
  // arryOfStatusCompleted = [];
  // public table: boolean = true;

  constructor(private app: AppComponent, private authService: AuthService, private reviewArtisan: ArtisanReviewService, private modalController: ModalController) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }
  // constructor(private authService: AuthService, private reviewArtisan: ArtisanReviewService) { }
  rateArtisan(id, data) {
    this.reviewArtisan.review(id, data).subscribe(res => {
      console.log(res);

    })
  }

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

  ngOnInit() {
    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    this.arryOfStatus=this.bookings;                                 

  }

  //Filtered by Status PENDING
  filteredByPending(items: any[], searchText: any): any[] {
    console.log(searchText)
    if (!items) {
      return this.arryOfStatus = [];
    }
    if (!searchText) {
      return this.arryOfStatus = items;
    }
    this.arryOfStatus = items.filter((filtered) => {
      return filtered.status.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    });

    console.log("Array of STATUS: ", this.arryOfStatus)

  }

  ///Filtered by Status ONGOING
  filteredByOngoing(items: any[], searchText: any): any[] {
    console.log(searchText)
    if (!items) {
      return this.arryOfStatus = [];
    }
    if (!searchText) {
      return this.arryOfStatus = items;
    }
    this.arryOfStatus = items.filter((filtered) => {
      
      return filtered.status.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
      
    });

    console.log(this.arryOfStatus)
  }

  // //Filtered by Status COMPLETED
  filteredByCompleted(items: any[], searchText: any): any[] {
    console.log(searchText)
    if (!items) {
      return this.arryOfStatus = [];
    }
    if (!searchText) {
      return this.arryOfStatus = items;
    }
    this.arryOfStatus= items.filter((filtered) => {
      return filtered.status.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    });

    // console.log("Array of STATUS: ", this.arryOfStatusCompleted)
  }

  async passToOrders(b) {
    const modal = await this.modalController.create({
      component: ModalBookingsPage,
      componentProps: {
        status: b.status, id: b._id, service_booking: b.service_booking,
        updatedAt: b.updatedAt, service_location: b.service_location,
        cost: b.cost, notes: b.notes
      },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    modal.present();
  }

}

