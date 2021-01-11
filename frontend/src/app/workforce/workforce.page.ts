import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { WebRequestService } from 'src/app/api/services/api/services/workforce/web-request.service';
import { Banned } from 'src/app/api/services/api/models/workforce/banned';
import { Ideal } from 'src/app/api/services/api/models/workforce/ideal';




@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage {

  segmentModel = "workforceIdeals";

  public ideals: Ideal;

  public banned: Banned;

  constructor(
    private webRequestService: WebRequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //For displaying of ideals list
    this.webRequestService.getWorkforceIdeal().subscribe((ideals: Ideal) => {
      this.ideals = ideals;

      console.log(ideals);
    });

    //For displaying of banned list
    this.webRequestService.getWorkforceBanned().subscribe((banned: Banned) => {
      this.banned = banned;
      console.log(banned);
    });
  }

  segmentChanged(event) {
  }

  //Function for deleting data from ideal by an id.
  dltList(ids) {
    this.webRequestService.deleteWork(ids).subscribe((response: any) => {

    });
  }

  //Function for deleting data from banned by an id.
  dltBanned(ids) {
    this.webRequestService.deleteWorkforceBanned(ids).subscribe((response: any) => {

    });
  }
}