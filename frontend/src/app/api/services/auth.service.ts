import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { switchMap, take, tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable()
export class AuthService {

  public user: Observable<any>;
  AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/';
  authSubject = new BehaviorSubject(false);
  
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private router: Router,
  ) { 
    this.platform.ready().then(() => {
      this.loadStoredToken();
    });
  };

  loadStoredToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authSubject.next(true);
        this.user = res.user;
      }
    })
  }

  register(data): Observable<any> {
    let url = this.AUTH_SERVER_ADDRESS + 'authenticate/register';

    return this.httpClient.post<any>(url, data).pipe(
      tap(async (res) => {
        if (res) {
          this.authSubject.next(true);
        }
      }));
  };

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}authenticate/login`, user).pipe(
      take(1),

      switchMap(token => {
        console.log("Auth Service token in login: ", token);
        this.authSubject.next(true);
        this.user = token.user;

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })

    );
  };

  updateContactInfo(user : User){
    console.log('nisud sa auth service.')
    console.log(user)
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/profile`, user)
  }

  getUser() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        return res.user;
      } else {
        return null;
      }
    })
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('home');
      this.authSubject.next(false);
    });
  };

  isLoggedIn() {
    return this.authSubject.value;
  };
}
