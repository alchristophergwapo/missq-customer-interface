import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth/auth.service';
import { AppComponent } from '../app.component';
import {ModalController} from '@ionic/angular';
import {ModalpopupPage} from '../modalpopup/modalpopup.page'

// added today
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { waitForAsync } from '@angular/core/testing';
// until here

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  logo: string;
  user: any;
  isUpdated = false;


  constructor(private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController,private app: AppComponent, private modalController:ModalController) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }


  OpenModal()
  {
    this.modalController.create({component:ModalpopupPage}).then((modalElement)=> {
      modalElement.present();
    })
  }

  ngOnInit() {
  }
}
