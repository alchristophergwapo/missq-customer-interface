import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {ModalController} from '@ionic/angular';
import {ModalpopupPage} from '../modalpopup/modalpopup.page'

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
    private app: AppComponent, private modalController:ModalController, ) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }


  // OpenModal()
  // {
  //   this.modalController.create({component:ModalpopupPage,cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
    
  //     modalElement.present(); 
  //   })
  // }

  editProfile(){
    this.modalController.create({component:ModalpopupPage,cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
      modalElement.present(); 
    })
  }

  ngOnInit() {
  }
}
