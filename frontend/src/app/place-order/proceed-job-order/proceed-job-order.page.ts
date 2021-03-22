import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { MsqService } from '../../services/msq-service.service';
import { GcashPaymentInfoPage } from '../gcash-payment-info/gcash-payment-info.page';

@Component({
  selector: 'app-proceed-job-order',
  templateUrl: './proceed-job-order.page.html',
  styleUrls: ['./proceed-job-order.page.scss'],
})
export class ProceedJobOrderPage implements OnInit {
  @Input() service_booking: string;
  @Input() service_location: string;
  @Input() cost: number;
  @Input() notes: string;

  data: any;
  constructor(private loadingController: LoadingController, private service: MsqService,
    private router: Router, private toastController: ToastController, private modalController: ModalController
  ) { }

  ngOnInit() {


    this.data = {
      schedule: '',
      payment_method: 'cash',
      service_booking: this.service_booking,
      service_location: this.service_location,
      cost: this.cost,
      notes: this.notes,
    }
    console.log(this.service_booking);

  }

  submit(form) {
    console.log(form.value);

    let pipe = new DatePipe('en-US');
    let date = new Date()
    let todayDate = pipe.transform(date, "YYYY-MM-ddTHH:mm")
    let scheduleHour = new Date(form.value.schedule).getHours();

    if (todayDate == form.value.schedule || todayDate > form.value.schedule || scheduleHour < (date.getHours() + 2) && pipe.transform(todayDate, "YYYY-MM-dd") == pipe.transform(form.value.schedule, "YYYY-MM-dd")) {
      this.presentErrorToast();
    } else {
      if (todayDate < form.value.schedule) {
        this.openGCashModal(form.value);
      }
    }
  }

  async openGCashModal(form) {
    const modal = await this.modalController.create({
      component: GcashPaymentInfoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        service_booking: this.data.service_booking,
        service_location: this.service_location,
        cost: this.data.cost,
        notes: this.data.notes,
        schedule: form.schedule,
        payment_method: form.payment_method
      }
    });
    this.closeModal();
    return await modal.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      header: 'Error Message!',
      message: 'Date of service must be 2 hours ahead or the day after today.',
      position: 'top',
      color: 'danger',
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

  closeModal() {
    this.modalController.dismiss();
    const params = {
      service_booking: this.service_booking,
      cost: Math.round(this.cost),
      notes: this.notes
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        bookedData: JSON.stringify(params)
      }
    };
    this.router.navigate(
      ["place-order/location-select"],
      navigationExtras
    );
  }

}
