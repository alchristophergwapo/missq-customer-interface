import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Ideal } from '../../models/workforce/ideal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  public uri: Observable<any>;
  readonly ROOT_URL;
  errorMsg: string;
  

  constructor(private http: HttpClient, private route: Router) {
    this.ROOT_URL = 'http://localhost:8080/workforce';
   }

   get():Observable<any> {
    return this.http.get(`${this.ROOT_URL}/ideal`);
   }

   post(uri:Ideal):Observable<any> {
    return this.http.post(`${this.ROOT_URL}/ideal`, uri);
   }

   patch(uri:string, payload:Object) {
     return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
   }

   deleteWork(uri):Observable<any> {
    console.log("URL:"+`${this.ROOT_URL}/ideal/${uri}`);
    this.route.navigate(['/workforce/ideal']);
    return this.http.delete(`${this.ROOT_URL}/ideal/${uri}`)
    .pipe(
      catchError(error => {
        this.errorMsg = error.message;
        return of([]);
        })
      );
   }

  reRoute()  {
    this.route.navigate(['/ideal/:id']);
}

}
