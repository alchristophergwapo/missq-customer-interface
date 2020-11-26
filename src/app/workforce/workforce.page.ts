import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WebRequestService } from 'src/app/api/services/workforce/web-request.service';
import { Ideal } from '../api/models/workforce/ideal';


@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage{
  
  segmentModel:"workforceIdeals";

  public ideals: Ideal;

  banned = ['Aquino', 'Roxas', 'Pnoy', 'Estrada'];

 
  // dltIdeal(i) {
  //   console.log(" Ideal deleted.");
  //   this.ideals.splice(i,1);
  // }

  dltBanned(i) {
    console.log(" Banned deleted.");
    this.banned.splice(i,1);
  }
  constructor(
    private webRequestService: WebRequestService, 
    private route : ActivatedRoute
    ){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      // console.log(params);
    });

    this.webRequestService.get().subscribe((ideals : Ideal) => {
      this.ideals = ideals;
      // console.log(ideals);
    });
  }

  segmentChanged(event){
  }

  getList() {
    
  }
  postList(i) {
    this.webRequestService.post(i).subscribe((response : any) => {
      console.log(response);
    });
  }

  dltList(ids) {
    this.webRequestService.deleteWork(ids).subscribe((response : any) => {

    });
  }
}
