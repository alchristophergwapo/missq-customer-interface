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

 public type = 'password';
  public showPass = false;
  name: string;
  password: string;

// passwordType: string = 'password';
// eye: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private dash: AppComponent
  ) 
  { 
    this.name = 'geneva1@gmail.com';
    this.password = "jhenRivas1999";
  }

  // public hideShowPassword(){
  //   if(this.eye){
  //     this.eye = false;
  //     this.passwordType = 'password';
  //   }else{
  //     this.eye = true;
  //     this.passwordType = 'password';
  //   }
  // }
  
  showPassword() {
     this.showPass = !this.showPass;
     if(this.showPass){
       this.type = 'text';
     } else {
       this.type = 'password';
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
