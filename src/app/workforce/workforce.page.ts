import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage{
  
  segmentModel = "ideal";

  ideal = [];

  banned = ['Aquino', 'Roxas', 'Pnoy', 'Estrada'];

 
  dltIdeal(i) {
    console.log(" Ideal deleted.");
    this.ideal.splice(i,1);
  }

  dltBanned(i) {
    console.log(" Banned deleted.");
    this.banned.splice(i,1);
  }
  constructor(){}

  ngOnInit(){

  }

  segmentChanged(event){

  }
}
