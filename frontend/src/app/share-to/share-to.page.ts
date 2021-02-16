import { Component, OnInit } from '@angular/core';
import { ShareToPageModule } from './share-to.module';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-share-to',
  templateUrl: './share-to.page.html',
  styleUrls: ['./share-to.page.scss'],
})
export class ShareToPage {
  
  constructor(public modalController: ModalController) {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ShareToPageModule,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  

}
