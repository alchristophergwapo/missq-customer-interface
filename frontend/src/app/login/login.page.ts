import { Component, OnInit } from '@angular/core';
import { AuthService } from "../api/services/auth.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  errors: Array<any> = [];

// passwordType: string = 'password';
// eye: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private dash: AppComponent
  ) 
  { 
    this.name = 'alchristopheroppa0143@gmail.com';
    this.password = "Toper@3013";
  }
  
  showPassword() {
     this.showPass = !this.showPass;
     if(this.showPass){
       this.type = 'text';
     } else {
       this.type = 'password';
     }
  }
  async login(form) {
    // console.log(form.value);
    await this.authService.login(form.value).subscribe((res) => {
      console.log("Result: ", res);
      
      if (res.status == 200) {
        this.router.navigateByUrl('/place-order');
        this.dash.dashboard = true;
      } else {
        this.errors.push(res);
        // const alert = this.alertCtrl.create({
        //   header: 'Login Failed',
        //   message: res.error,
        //   buttons: ['Ok']
        // }).then(alert => alert.present());
        // ;
      }
    }),((error) => {
      console.log(error);
      
    });
  }

  ngOnInit() {
  }
}
