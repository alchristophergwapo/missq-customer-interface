import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WorkforceService } from '../workforce.service';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage{
  
  segmentModel = "ideal";

  ideals: any;

  banned = ['Aquino', 'Roxas', 'Pnoy', 'Estrada'];

 
  dltIdeal(i) {
    console.log(" Ideal deleted.");
    this.ideals.splice(i,1);
  }

  dltBanned(i) {
    console.log(" Banned deleted.");
    this.banned.splice(i,1);
  }
  constructor(private workforceService : WorkforceService, private route : ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    });

    this.workforceService.getList().subscribe((ideals : any[]) => {
      this.ideals = ideals;
      console.log(ideals);
    });
  }

  segmentChanged(event){
  }

  getList() {
    
  }
  createList() {
    this.workforceService.createList('Another testing.').subscribe((response : any) => {
      console.log(response);
    });
  }

  dltList(ids) {
    this.workforceService.deleteList(ids).subscribe((response : any) => {
      console.log(response);
      console.log(ids);
      console.log("Delete List");
    });
  }
}
