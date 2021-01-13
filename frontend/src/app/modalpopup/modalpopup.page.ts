import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  user:any;

  constructor(private modalController:ModalController, private authService:AuthService, private router:Router,
     private app : AppComponent
     ) { 
    this.user = app.user;
    console.log("Naa sa profile: ", this.user);
  }

  ngOnInit() {
  }

  CloseModal()
  {
    this.modalController.dismiss();
  }
  updateContactInfo(form){
    this.authService.updateContactInfo(form.value).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/profile');
        console.log('nice nisud na')
      }
    });
    console.log("maoy sulod sa form ", form.value);
  }
  getUser(){
    
  }

}
