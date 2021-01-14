import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {ModalController} from '@ionic/angular';
import {ModalpopupPage} from '../modalpopup/modalpopup.page'
import { AuthService } from '../api/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  logo: string;
  user: any;
  isUpdated = false;

  constructor(
    private app: AppComponent, private modalController:ModalController, private authService:AuthService ) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }


  // OpenModal()
  // {
  //   this.modalController.create({component:ModalpopupPage,cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
    
  //     modalElement.present(); 
  //   })
  // }

  editProfile() {
    this.modalController.create({component:ModalpopupPage, cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
      modalElement.present(); 
    })
  }

  ngOnInit() {
    console.log("data====",this.authService.getUser())
    this.authService.getUser().then(user => {
      this.user = user;
    })
  }
}
