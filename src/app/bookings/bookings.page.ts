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
  
  ngOnInit(){
    // this.bookingSubmit()
  }

  bookingSubmit() {
    this.bookings = {
      service_bookings: "",
      houseOfService: "",
      notes: "",
      location: "",
    };
    // fetch().then(async res => {
    //   let result = await res.json();
    //   this.bookings = result.data;
      
    // })
    this.msqService.getMyBookings(this.app.user._id).subscribe(response => {
      console.log(response);
    });
  }

}
