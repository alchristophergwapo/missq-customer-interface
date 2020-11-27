import { Component, OnInit } from '@angular/core';
import { AuthService } from "../api/services/auth/auth.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { waitForAsync } from '@angular/core/testing';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  name: string;
  password: string;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private dash: AppComponent
  ) { 
    this.name = 'chu@gmail.com';
    this.password = "M@chuy012";
  }

  login(form) {
    // console.log(form.value);
    this.authService.login(form.value).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/place-order');
        this.dash.dashboard = true;
      } else {
        const alert = this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials!',
          buttons: ['Ok']
        }).then(alert => alert.present());
        ;
      }
    });
  }

  ngOnInit() {
  }

}
