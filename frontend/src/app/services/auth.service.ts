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
  // AUTH_SERVER_ADDRESS: string = 'http://msqcustomerinterfacebackend-env-1.eba-negj35aw.us-east-2.elasticbeanstalk.com/';
  // AUTH_SERVER_ADDRESS: string = 'http://localhost:8080/';
  AUTH_SERVER_ADDRESS: string = 'http://3.137.219.17:8080/';

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

  register(data) {
    let url = this.AUTH_SERVER_ADDRESS + 'authenticate/register';

    // var formData: any = new FormData();

    // formData.append('name', data.name);
    // formData.append('address', data.address);
    // formData.append('code', data.code);
    // formData.append('phone', data.phone);
    // formData.append('email', data.email);
    // formData.append('birth_date', data.birth_date);
    // formData.append('password', data.password);
    // formData.append('picture', data.picture);
    // formData.append('id_image', data.id_image);
    // formData.append('id_number', data.id_number);
    console.log(data);

    return this.httpClient.post(url, data);
  };

  uploadImage(id_image, selfie, id_image_name, selfie_name) {
    var formData: any = new FormData();
    formData.append('img[]', id_image, id_image_name);
    formData.append('img[]', selfie, selfie_name)
    console.log("FORM DATA:: ", formData);
    formData.forEach(element => {
      console.log(element, "gesap");
    });


    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}authenticate/upload_images`, formData)
  }

  login(user: User) {
    // console.log("nisud sa log in function")
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}authenticate/login`, user)
      .pipe(
        tap(res => {
          if (res) {
            console.log('nisud sa tap');
            this.authSubject.next(true);
            this.user = res.user;
            this.storage.set(TOKEN_KEY, res);
          }
        })

      );
  };

  deleteAccount(id) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}authenticate/delete_account`, { id: id })
  }

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
  filteredOngoing(datas): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}msq_service/filteredOngoing`, datas)
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
