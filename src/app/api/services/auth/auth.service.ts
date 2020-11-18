import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { AuthResponse } from '../../authentication/auth-response';
import { async } from 'q';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/authenticate';
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
  ) { };

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res) => {
        if (res.status == 200 ) {
          this.authSubject.next(true);
        }
      }));
  };

  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res) => {
        if(res.status == 200) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          await this.storage.set("EXPIRES_IN", res.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  };

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  };

  isLoggedIn() {
    return this.authSubject.asObservable();
  };

}
