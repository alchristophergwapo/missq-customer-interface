import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
})
export class WorkforcePage{
  
  ideal = ['Nanay', 'Nonoy', 'Nini'];

  banned = ['Aquino', 'Roxas', 'Pnoy', 'Estrada'];

}
