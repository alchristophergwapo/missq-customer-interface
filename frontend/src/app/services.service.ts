import { Injectable } from '@angular/core';
// import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryCodes } from './countryCodeModel';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  public apiUrl = "http://localhost:3000/data"
  public apiFinal = "http://localhost:3000/score"

  constructor(private http: HttpClient) { }

  getData(): Observable<CountryCodes[]> {
    return this.http.get<CountryCodes[]>(this.apiUrl);
  }

  // postData(data: CountryCodes) {
  //   return this.http.post(this.apiUrl, data);
  // }


  // updateData(data: CountryCodes) {
  //   return this.http.put<CountryCodes[]>(this.apiUrl, data), this.httpOptions;
  // }

  // deleteData(id: any){
  //   return this.http.delete<CountryCodes[]>(`${this.apiUrl}/${id}`, this.httpOptions);
  // }

  // getScore(): Observable<any[]> {
  //   return this.http.get<CountryCodes[]>(this.apiFinal);
  // }

}

