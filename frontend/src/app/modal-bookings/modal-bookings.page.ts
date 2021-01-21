import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../api/services/auth.service';

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
  arrayOfStatus=[];
  // rating: boolean = true;

  constructor(private app: AppComponent, private authService: AuthService, private modalController: ModalController) { 
    this.user = this.authService.user;
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

  deleteBtn(){
    console.log("sldkhfksdhk");
    
    this.authService.deleteBookings(this.id).subscribe((data) => {
      console.log(data)
      // this.arrayOfStatus = data.data;
      
    })
    
  }

  // async passToOrders(b) {
  //   const modal = await this.modalController.create({
  //     component: ModalBookingsPage,
  //     componentProps: {
  //       status: b.status, id: b._id, service_booking: b.service_booking,
  //       updatedAt: b.updatedAt, service_location: b.service_location,
  //       cost: b.cost, notes: b.notes
  //     },
  //     cssClass: 'setting-modal',
  //     backdropDismiss: false,
  //   });
  //   modal.present();
  // }
}
