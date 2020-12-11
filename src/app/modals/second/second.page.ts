import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  user: any;

  constructor(private modalController: ModalController,private app: AppComponent) {
    this.user = app.user;
      console.log("On profile: ", this.user);
   }

  ngOnInit() {}
  async closeModal() {
    await this.modalController.dismiss();
  }
}
