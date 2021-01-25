import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../api/services/auth.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private toastCtrl: ToastController, private app: AppComponent, private authService: AuthService, private modalController: ModalController) { 
    this.user = this.authService.user;
  }

  ngOnInit() 
  {

    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
  }


  closeModal()
  {
    this.modalController.dismiss();
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
            console.log("this.proceedAlert();")
          }
        }
      ]
    });
    toast.present();
  }


}
