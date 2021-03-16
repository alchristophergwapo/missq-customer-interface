import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  loaded: boolean = false;

// passwordType: string = 'password';
// eye: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController, 
    private dash: AppComponent,
    private loadingController: LoadingController
  ) 
  { 
    this.name = '';
    this.password = "";
  }
  
  ngOnInit() {
  }
  
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
    this.presentLoading();
    
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

  async presentLoading() {
    this.loaded = false;
    const loading = await this.loadingController.create({
      spinner: "dots",
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      animated: true,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.loaded = true;
    console.log('Loading dismissed!');
  }

}