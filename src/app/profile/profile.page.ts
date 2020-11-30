import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth/auth.service';
import { AppComponent } from '../app.component';

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
    private alertCtrl: AlertController,private app: AppComponent) {
    this.user = app.user;
    console.log("On profile: ", this.user);
  }

  updateContactInfo(form){
    this.authService.updateContactInfo(form.value).subscribe((response) => {
      if (response) {
        // this.router.navigateByUrl('/profile');
        console.log('nice nisud na')
      }
    });
  }

  ngOnInit() {
  }
}
