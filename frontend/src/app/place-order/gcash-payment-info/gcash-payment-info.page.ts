import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MsqService } from 'src/app/services/msq-service.service';


const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-gcash-payment-info',
  templateUrl: './gcash-payment-info.page.html',
  styleUrls: ['./gcash-payment-info.page.scss'],
})
export class GcashPaymentInfoPage implements OnInit {

  @Input() status: string = "Pending";
  @Input() service_booking: string;
  @Input() service_location: string;
  @Input() cost: number;
  @Input() notes: string;
  @Input() payment_method: string;
  @Input() schedule: string;

  author: any;
  data: any;
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private service: MsqService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {

    this.author = this.authService.user

    this.data = {
      schedule: this.schedule,
      payment_method: this.payment_method,
      service_booking: this.service_booking,
      service_location: this.service_location,
      cost: this.cost,
      notes: this.notes,
      status: "Pending",
      author: this.author
    }
    console.log(this.service_booking);

  }

  bookServiceNow() {
    console.log(this.data);

    this.presentLoading();

    this.service.bookNow(this.data).subscribe(response => {
      if (response) {
        this.storage.get(TOKEN_KEY).then(res => {
          res.user.bookings = response.bookings;
          this.authService.user = res.user;
          this.storage.set(TOKEN_KEY, res);
        })
        this.presentToast(response.message, 'success')
        this.closeModal();
        this.router.navigateByUrl('/place-order');
      }
    },
      error => {
        this.presentToast(error.message, 'danger')
      }
    );
  }

  async presentToast(message, type) {
    const toast = await this.toastController.create({
      header: 'Response Message!',
      message: message,
      position: 'top',
      color: type,
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

  closeModal() {
    this.modalController.dismiss();
  }
}
