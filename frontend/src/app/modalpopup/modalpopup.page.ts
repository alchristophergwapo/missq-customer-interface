import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Storage } from "@ionic/storage";
const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  user:any;

  constructor(private modalController: ModalController, private authService:AuthService,private storage: Storage, private router:Router) {
    // this.user = {name:"", phone: "",address: "", email: "", id_number: "", id:""}
  }

  ngOnInit() {
    
    console.log("data====",this.authService.getUser())
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
    // form.value.id = this.user.id
    
    this.authService.updateContactInfo(form.value).subscribe((response) => {
      if (response) {
        this.storage.set(TOKEN_KEY, response.access_token);
        this.router.navigateByUrl('/profile');
        console.log('nice nisud na')
      }
    });
    console.log("maoy sulod sa form ",form);
  }
  getUser(){
  }

}
