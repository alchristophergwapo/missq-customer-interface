import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Artisan } from '../models/artisan';


@Injectable({
  providedIn: 'root'
})
export class WorkforceService {

  public uri: Observable<any>;
  public artisans: Observable<any>;
  readonly ROOT_URL;
  errorMsg: string;


  constructor(private http: HttpClient, private route: Router) {
    this.ROOT_URL = 'http://3.137.219.17:8080/workforce';
  }

  //Get service of ideal
  getWorkforceIdeal(): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/ideal`);
  }

  //Get service of banned
  getWorkforceBanned(): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/banned`);
  }


//pinataka
  getDetails(id): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/ideal/information/${id}`);
}





  //  post(uri:Ideal):Observable<any> {
  //   return this.http.post(`${this.ROOT_URL}/ideal`, uri);
  //  }

  //  patch(uri:string, payload:Object) {
  //    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  //  }

  //Delete service of ideal
  deleteWork(uri): Observable<any> {
    // console.log("URL:" + `${this.ROOT_URL}/ideal/${uri}`);
    this.route.navigate(['/workforce/ideal']);
    return this.http.delete(`${this.ROOT_URL}/ideal/${uri}`)
      .pipe(
        catchError(error => {
          this.errorMsg = error.message;
          return of([]);
        })
      );
  }

  //Delete service of banned
  deleteWorkforceBanned(uri) {
    this.route.navigate(['/workforce/banned']);
    return this.http.delete(`${this.ROOT_URL}/banned/${uri}`)
      .pipe(
        catchError(error => {
          this.errorMsg = error.message;
          return of([]);
        })
      );
  }

  informationIdeal(uri) {
    return this.http.get(`${this.ROOT_URL}/ideal/information/${uri}`)
    .pipe(
      catchError(error => {
        this.errorMsg = error.message;
        return of([]);
      })
    );
  }

  informationBanned(uri) {
    return this.http.get(`${this.ROOT_URL}/banned/infomation/${uri}`)
    .pipe(
      catchError(error => {
        this.errorMsg = error.message;
        return of([]);
      })
    );
  }

  reRoute() {
    this.route.navigate(['/ideal/:id']);
  }

}