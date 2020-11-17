import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  logo: string;
  user: any;

  constructor(private app: AppComponent) {
    this.user = app.user;
  }

  ngOnInit() {
  }

}
