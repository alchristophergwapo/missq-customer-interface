import { Component, OnInit } from '@angular/core';

import { Platform, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';
import {Router } from '@angular/router';
import { AuthService } from './api/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  dashboard : boolean = true;
  currentRoute: string;
  user: any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.initializeApp();
  }

  onClickNav(event) {

    event.preventDefault();

    event.target.parentElement.classList.add("active");

    var activeElement = document.getElementsByClassName("active");

    for (var index = 0; index < activeElement.length; index++) {

      if (activeElement[index].id !== event.target.parentElement.id) {
        activeElement[index].classList.remove("active");
      }
    }

    // setTimeout(() => {
    //   this.currentRoute = window.location.pathname;

      // if (this.currentRoute == '/home' || this.currentRoute == '/create-account' || this.currentRoute == '/login' || this.currentRoute == '/live-chat' || this.currentRoute == '/settings') {
      //   this.dashboard = false;
      // } else {
      //   this.dashboard = true;
      // }

    // }, 300)

  };

  async clickChatSupport() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chat Support',
      buttons: [{
        text: 'Live Chat',
        role: 'destructive',
        icon: 'chatbubbles-outline',
        cssClass: 'chat',
        handler: () => {
          this.router.navigateByUrl('live-chat');
          this.dashboard = false;
        }
      },
      {
        text: 'Email Us',
        icon: 'mail-outline',
        cssClass: 'mail',
        handler: () => {
          console.log('Email Chat');
        }
      },
      {
        text: 'FAQ',
        icon: 'help-circle-outline',
        cssClass: 'help',
        handler: () => {
          console.log('Frequently Ask Questions');
        }
      }]
    });
    await actionSheet.present();
  };

  setDashboard(bool) {
    if (bool) {
      this.dashboard = true;
    } else {
      this.dashboard = false;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authSubject.subscribe(state => {
        if (state) {
          // this.router.navigate(['place-order']);
          // this.user = state.user;
        } else {
          // this.router.navigate(['home']);
        }
      });

      this.currentRoute = window.location.pathname;

      if (this.currentRoute == '/home' || this.currentRoute == '/create-account' || this.currentRoute == '/login' || this.currentRoute == '/live-chat' || this.currentRoute == '/settings') {
        this.dashboard = false;
      } else {
        this.dashboard = true;
      }
    });
  }

  ngOnInit() {
  }
}
