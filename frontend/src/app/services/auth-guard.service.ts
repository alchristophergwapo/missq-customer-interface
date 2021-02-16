import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public isAuthenticated: AuthService,private router: Router, private alertControl: AlertController) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isAuthenticated.authSubject.pipe(
      take(1),
      map(user => {
        // console.log("Can activate: ", user);
        if (!user) {
          this.alertControl.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access that page. Please login!',
            buttons: ['Ok']
          }).then(alert => alert.present());

          return false;

        } else {
          return true;
        }
      })
    );
  }
}
