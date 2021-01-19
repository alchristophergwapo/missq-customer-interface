import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {ModalController} from '@ionic/angular';
import {ModalpopupPage} from '../modalpopup/modalpopup.page'
import { AuthService } from '../api/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  logo: string;
  user: any;

  constructor(
     private modalController:ModalController, private authService:AuthService ) {

    this.user = {name:"", phone: "",address: "", email: "", id_number: "", id:"", birth_date: ""}
  }

   ngOnInit() {
      this.authService.getUser().then(user =>{
      this.user= user;
    })   
   }

  editProfile() {
    this.modalController.create({component:ModalpopupPage, cssClass: 'my-custom-modal-css'}).then((modalElement)=> {
      modalElement.present(); 
    })
  }
  updateUser(){ 
    this.authService.getUser().then(user =>{
      this.user= user;
    console.log("update user ni siya char lang huuhuhaha", this.user)

    })
  }
  

 
}
