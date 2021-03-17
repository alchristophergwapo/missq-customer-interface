import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {

  segmentModel: "cash-in";
  constructor(
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.presentErrorToast();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      header: 'Attention: ',
      message: 'This page is under construction/development !!... Thank You :)',
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            // this.proceedAlert();
          }
        }
      ]
    });
    toast.present();
  }

  segmentOnChange(event){
  }
}