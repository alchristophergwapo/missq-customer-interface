import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  errorMsg: string;
  

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://msqcustomerinterfacebackend-env-1.eba-negj35aw.us-east-2.elasticbeanstalk.com/';
   }

   get(uri:string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   post(uri:string, payload:Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
   }

   patch(uri:string, payload:Object) {
     return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
   }

   delete(uri:string, id:string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`)
    .pipe(
      catchError(error => {
        this.errorMsg = error.message;
        return of([]);
        })
      );
   }

}
