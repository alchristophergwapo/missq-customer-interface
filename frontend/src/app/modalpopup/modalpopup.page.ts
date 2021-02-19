import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Storage } from "@ionic/storage";
import { ProfilePage } from '../profile/profile.page';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  user: any;
  readonly: boolean;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private profile: ProfilePage,
    private app: AppComponent) {
    this.user = { picture: "", name: "", phone: "", address: "", email: "", id_number: "", id: "" }
    this.readonly = true
  }

  ngOnInit() {
    console.log("every open sa modal ni siya")
    this.authService.getUser().then(user => {
      this.user = user;
      this.user.name = user.name;
    })
  }

  updateContactInfo(form) {
    this.authService.updateContactInfo(form.value).subscribe((response) => {
      if (response) {
        console.log(response);
        this.app.user.name = response.user.name;
        this.profile.user = response.user;
        this.app.dashboard = true;
        this.profile.user = response.user;
        console.log("App Component user: ", this.app.user);
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Profile updated successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.router.navigate(['/profile']);
    });
    console.log("maoy sulod sa form ", form);
  }


  async CloseModal() {
    await this.modalController.dismiss();
  }


}
