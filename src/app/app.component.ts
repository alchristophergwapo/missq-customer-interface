import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private actionSheetController: ActionSheetController
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
          console.log('Live Chat');
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    
  }
}
