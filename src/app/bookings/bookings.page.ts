import { Component, OnInit } from '@angular/core';
// import { AppComponent } from '../app.component';

import { AppComponent } from '../app.component';
import { MsqService } from '../api/services/service/msq-service.service';
import { AuthService } from '../api/services/auth/auth.service';

import { ModalController } from '@ionic/angular';
import { SecondPage } from '../modals/second/second.page';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: any;  
  user: any;


  constructor(private app: AppComponent, private authService: AuthService, private modalController:ModalController) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }

  

  ngOnInit() {
    if (this.authService.user['bookings']) {
      this.bookings = this.authService.user['bookings'];
    }
    console.log("On bookings page ts: ", this.authService.user);
    
  }

}
