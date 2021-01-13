import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Banned } from 'src/app/api/models/workforce/banned';
import { Ideal } from 'src/app/api/models/workforce/ideal';
// import { Artisan } from 'src/app/api/models/artisan';

import { WorkforceService } from 'src/app/api/services/workforce.service';

import { ModalController } from '@ionic/angular';
import { InformationModalPage } from '../information-modal/information-modal.page';




@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage {

  segmentModel = "workforceIdeals";

  public ideals: Ideal;
  public banned: Banned;
  // public worker: Artisan;

  constructor(
    private workforceService: WorkforceService,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: InformationModalPage,
      cssClass: 'my-custom-class'
    });
    
    return await modal.present();
  }

  ngOnInit() {

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

  showInfo(ids) {
    this.workforceService.informationIdeal(ids).subscribe((response:any) => {

    });
  }
}