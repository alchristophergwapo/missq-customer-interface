import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    console.log(this.authService.user);
    
  }

  ngOnInit() {
    this.user = this.authService.user;
    console.log(this.user);
  }

}
