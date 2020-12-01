import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { AuthService } from '../api/services/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  constructor(private modalController:ModalController, private authService:AuthService, private router:Router) { }

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
  }

}
