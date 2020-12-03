import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MsqService } from '../api/services/service/msq-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: any;

  constructor(private app: AppComponent, private msqService: MsqService) { }

  ngOnInit() {
    // this.msqService.getMyBookings().subscribe(response => {
    //   console.log(response);
    // });
  }

}
