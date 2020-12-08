import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MsqService } from '../api/services/service/msq-service.service';
import { AuthService } from '../api/services/auth/auth.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userBookings = this.authService.user;

    this.bookings = userBookings['bookings']
    
  }

}