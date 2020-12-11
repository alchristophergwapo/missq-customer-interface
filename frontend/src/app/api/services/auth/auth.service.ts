import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthResponse } from '../../authentication/auth-response';
import { JwtHelperService } from "@auth0/angular-jwt";

import { take, switchMap } from "rxjs/operators";
import { Platform } from '@ionic/angular';

import { FileTransfer, FileTransferObject, FileUploadOptions } from "@ionic-native/file-transfer/ngx";

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
    private transfer: FileTransfer
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

  register(user: User, img, desc): Observable<AuthResponse> {
    let url = this.AUTH_SERVER_ADDRESS + 'authenticate/register'
    // File for Upload
    var targetPath = img;
 
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(targetPath, url, options);

    return this.httpClient.post<AuthResponse>(url, user).pipe(
      tap(async (res: AuthResponse) => {
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
