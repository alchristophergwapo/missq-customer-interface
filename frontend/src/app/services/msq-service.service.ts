import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class MsqService {

  public service: Observable<any>;
  // AUTH_SERVER_ADDRESS: string = 'http://msqcustomerinterfacebackend-env-1.eba-negj35aw.us-east-2.elasticbeanstalk.com/msq_service';
  AUTH_SERVER_ADDRESS: string = 'http://3.137.219.17:8080/msq_service';

  booked: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

  bookNow(service: Service): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/book_service`, service);
  }

  markAsDone(_id) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/mark_done/${_id}`, _id);
  }
}
