import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Storage } from "@ionic/storage";
import { ProfilePage } from '../profile/profile.page';
const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  user:any;
  readonly:boolean;

  constructor(private modalController: ModalController, private authService:AuthService,private storage: Storage, private router:Router, private profile: ProfilePage, private app: AppComponent) {
    this.user = {name:"", phone: "",address: "", email: "", id_number: "", id:""}
    this.readonly=true
  }

  ngOnInit() {
    console.log("every open sa modal ni siya")
    this.authService.getUser().then(user => {
      this.user = user;
      // console.log("user _ id :: ", this.user.id)
    })
  }

  CloseModal()
  {
    this.modalController.dismiss();
  }
  updateContactInfo(form){
    
    this.authService.updateContactInfo(form.value).subscribe((response) => {
      if (response) {
        console.log(response);
        
        this.profile.user = response.user;
        this.app.user = response.user;
        this.app.dashboard = true;
        console.log("Profile user: ", this.profile.user);
        this.profile.user = response.user;
        console.log("App Component user: ", this.app.user);
      }
    });
    console.log("maoy sulod sa form ",form);
    
  }

}
