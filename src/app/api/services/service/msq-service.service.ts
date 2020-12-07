import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Service } from "../../models/service";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MsqService{


  public service: Observable<any>;
  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/msq_service';
  booked: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

  bookNow(service: Service): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/book_service`, service);
  }

  getMyBookings(id): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}/bookings/${id}`).pipe(
      tap(async (response) => {
        this.booked = response.booking;
        console.log("On msq-service getMyBookings() :", this.booked);
        
      })
    );
  }

}
