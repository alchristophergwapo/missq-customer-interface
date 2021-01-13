import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../api/services/auth.service';

@Component({
  selector: 'app-modal-bookings',
  templateUrl: './modal-bookings.page.html',
  styleUrls: ['./modal-bookings.page.scss'],
})
export class ModalBookingsPage implements OnInit {

  bookings: any;
  user: any;

  // rating: boolean = true;

  constructor(private app: AppComponent, private authService: AuthService, private modalController: ModalController) { 
    
    this.user = app.user;
  }
    
  // ngOnInit() {
  // }
  ngOnInit() {

    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    
  }


  closeModal()
  {
    this.modalController.dismiss();
  }

}
