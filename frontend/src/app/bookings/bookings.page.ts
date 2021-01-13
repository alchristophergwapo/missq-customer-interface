import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import {ModalController} from '@ionic/angular';
import { ModalBookingsPage } from '../modal-bookings/modal-bookings.page';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: any;
  // public table: boolean = true;

  constructor(private authService: AuthService, private modalController: ModalController) { 
  }

  ngOnInit() {
    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    
  }

  // hideShow() {
  //   if(this.table){
  //     this.table = false;
  //   }else{
  //     this.table = true;
  //   }
  // }
  openModal()
  {
    console.log()
    this.modalController.create({component: ModalBookingsPage,cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
      modalElement.present(); 
    })



    // if(this.bookings.status = 'Pending') 
    // {
    //   console.log('walay nahitabo!')
    //   buttons: ['rating']
    // }
  }
}
