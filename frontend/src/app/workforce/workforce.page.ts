import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalController, ToastController } from '@ionic/angular';
import { InformationModalPage } from '../information-modal/information-modal.page';
import { Artisan } from '../models/artisan';
import { Banned } from '../models/workforce/banned';
import { Ideal } from '../models/workforce/ideal';
import { WorkforceService } from '../services/workforce.service';


@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage {

  segmentModel = "workforceIdeals";

  public ideals: Ideal;
  public banned: Banned;
  public worker: Artisan;
  public id

  constructor(
    private workforceService: WorkforceService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    //For displaying of ideals list
    this.workforceService.getWorkforceIdeal().subscribe((ideals: Ideal) => {
      this.ideals = ideals;
      console.log(ideals);

    });
    //For displaying of banned list
    this.workforceService.getWorkforceBanned().subscribe((banned: Banned) => {
      this.banned = banned;
      console.log(banned);
    });

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

  async openModal(i) {
    this.id = i.workerId

    const modal = await this.modalController.create({
      component: InformationModalPage,
      componentProps: {
        id: this.id,
      },
      cssClass: 'my-custom-class',
      backdropDismiss: false,
    });
    modal.present();
  }

  segmentChanged(event) {
  }

  //Function for deleting data from ideal by an id.
  dltList(ids) {
    this.workforceService.deleteWork(ids).subscribe((response: any) => {

    });
  }

  //Function for deleting data from banned by an id.
  dltBanned(ids) {
    this.workforceService.deleteWorkforceBanned(ids).subscribe((response: any) => {
    });
  }
}