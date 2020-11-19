import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthResponse } from '../../authentication/auth-response';
import { JwtHelperService } from "@auth0/angular-jwt";

import { take, map, switchMap } from "rxjs/operators";
import { Platform } from '@ionic/angular';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable()

export class AuthService {

  public user: Observable<any>;
  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/authenticate';
  authSubject = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private router: Router,
  ) { 
    this.loadStoredToken();
  };

  loadStoredToken() {
    let platformObservable = from(this.platform.ready());

    this.user = platformObservable.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token);
          this.authSubject.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          this.authSubject.next(res);
        }
      }));
  };

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      take(1),

      switchMap(token => {
        // console.log("Auth Service token in login: ", token);
        this.authSubject.next(token);

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })

    );
  };

  getUser() {
    return this.authSubject.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('place-order');
      this.authSubject.next(null);
    });
  };

  isLoggedIn() {
    return this.authSubject.value;
  };

}
