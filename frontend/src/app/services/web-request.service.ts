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
    this.ROOT_URL = 'http://3.137.219.17:8080';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string, id: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`)
      .pipe(
        catchError(error => {
          this.errorMsg = error.message;
          return of([]);
        })
      );
  }

}
