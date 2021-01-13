import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PhotoService } from '../api/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private photoService: PhotoService, private authenticationService: AuthService, private router: Router, private app: AppComponent) { }

  async ngOnInit() {

    this.app.dashboard = false;
    this.authenticationService.authSubject.subscribe(state => {
      
      if (state) {
        this.router.navigate(['place-order']);
      } else {
        this.router.navigate(['home']);
      }
    });

    await this.photoService.loadSaved();
  }

}
