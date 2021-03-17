import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalController } from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  logo: string;
  user: any;
  picture: any;

  constructor(private modalController: ModalController, private authService: AuthService, private storage: Storage, private app: AppComponent) {
    this.user = { name: "", phone: "", address: "", email: "", id_number: "", id: "", birth_date: "" }
    this.picture = "";
  }

  ngOnInit() {

    this.authService.getUser().then(user => {
      this.user = user;
      console.log("User Picture::", this.user.picture);
       this.picture =this.user.picture 
      
      this.user.picture = 'http://3.137.219.17:8080/public/images/' + this.picture
    });


    console.log("opened profile");
  }


  editProfile() {
    this.modalController.create({ component: ModalpopupPage, cssClass: 'my-custom-modal-css' }).then((modalElement) => {
      modalElement.present();
    })
  }

  updateUser() {
    this.authService.getUser().then(user => {
      this.user = user;
    })
  }
  updateUserinApp() {
    this.storage.get('jwt-token').then(async res => {
      if (res) {
        this.app.user = await res.user;
        console.log(res.user);
      }
    })
  }

}

