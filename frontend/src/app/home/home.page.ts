import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../api/services/auth.service';
import { Photo, PhotoService } from '../api/services/photo.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private photoService: PhotoService, private actionSheet: ActionSheetController,
    private authenticationService: AuthService, private router: Router, private app: AppComponent
  ) {
  }

  // addPhotoToGallery() {
  //   this.photoService.addNewToGallery();
  // }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheet.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();

    this.app.dashboard = false;
    this.authenticationService.authSubject.subscribe(state => {
      
      if (state) {
        this.router.navigate(['place-order']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}
