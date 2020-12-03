import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService: AuthService, private app: AppComponent) {
  }

  // logout() {
  //   this.authService.logout();
  //   console.log(this.authService.user);
    
  // }

  ngOnInit() {

  }

}
