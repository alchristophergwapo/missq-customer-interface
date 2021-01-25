import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  /**
   * 
   */

  loadStoredToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authSubject.next(true);
        this.user = res.user;
      }
    })
  }

  register(data, id_image, selfie) {
    let url = this.AUTH_SERVER_ADDRESS + 'authenticate/register';

    var formData: any = new FormData();

    console.log('Register::',data);
    

    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('code', data.code);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('birth_date', data.birth_date);
    formData.append('password', data.password);
    formData.append('picture', data.picture);
    formData.append('id_image', data.id_image);
    formData.append('id_number', data.id_number);
    formData.append('picture', id_image, data.id_image);
    formData.append('id_image', selfie, data.picture)
    // debugger

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    return this.httpClient.post<User>(url, JSON.stringify(formData), {
      reportProgress: true,
      observe: 'events'
    });
  };

  uploadImage(blobData, ext) {
    const formData: any = new FormData();
    var data ={
      key:"",
      value:""
    }
    formData.append('selfie', blobData, `myimage.${ext}`);

    for (let [key, value] of formData.entries()) {
      // console.log('Upload::',key, "value :: "+value);
      data.key = key;
      data.value = value;
    }
    console.log("data :: ", data)

    console.log("formData :: ",formData.entries() )

    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}authenticate/upload`, data);
  }

  login(user: User): Observable<any> {
    console.log("nisud sa log in function")
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}authenticate/login`, user).pipe(
      take(1),

      switchMap(token => {
        console.log("Auth Service token in login: ", token);
        this.authSubject.next(true);
        this.user = token.user;
        console.log("token :: ", TOKEN_KEY)

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })

    );
  };

  updateContactInfo(user: User) {
    console.log('nisud sa auth service.', user)
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}authenticate/profile`, user).pipe(
      take(1),

      switchMap(token => {
        console.log("Auth Service token in login: ", token);
        this.authSubject.next(true);
        this.user = token.user;
        console.log("token :: ", TOKEN_KEY)

        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        return storageObservable;
      })

    );
  }

  getAllMessages(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}chat/allMessages`);
  }

  //FILTERED STATUS
  filteredOngoing(arrays, datas): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}msq_service/filteredOngoing`, { array: arrays, data: datas })
  }

  getUser() {
    return this.storage.get(TOKEN_KEY).then(res => {
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
