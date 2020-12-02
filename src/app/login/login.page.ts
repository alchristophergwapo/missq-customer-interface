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

  // name: string;
  // password: string;

passwordType: string = 'password';
eye: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private dash: AppComponent
  ) 
  { 
    // this.name = 'testc@gmail.com';
    // this.password = "testc";
  }

  public hideShowPassword(){
    if(this.eye){
      this.eye = false;
      this.passwordType = 'password';
    }else{
      this.eye = true;
      this.passwordType = 'password';
    }
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
