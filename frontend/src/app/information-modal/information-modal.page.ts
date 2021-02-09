import { Component, OnInit, Input } from '@angular/core';
import { WorkforceService } from '../api/services/workforce.service';
import { Artisan } from 'src/app/api/models/artisan';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';






@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.page.html',
  styleUrls: ['./information-modal.page.scss'],
})
export class InformationModalPage implements OnInit {

  @Input() id: any;

  public workerInfo : any;

  constructor(
    private workforceService: WorkforceService,
    private modalController: ModalController,
    private route: ActivatedRoute,
  ) {
    this.workerInfo = {name : "", address: "", bday: "", phone : "", email: ""}
  }

  ngOnInit() {
    console.log(this.id);
    this.workforceService.informationIdeal(this.id).subscribe((works: Artisan) => {
    this.workerInfo = works;
    console.log('machuyy ' ,this.workerInfo);
    });
  }

  closeModal() {
    this.modalController.dismiss(); 

  }



}
