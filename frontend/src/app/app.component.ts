import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ActionSheetController, LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  dashboard: boolean = true;
  currentRoute: string;
  user: any;

  loaded: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
    this.presentLoading();
  }

  ngOnInit() {
    this.storage.get('jwt-token').then(async res=> {
      if (res) {
        // this.user = await res.user
        console.log(this.user);

        console.log(res.user)
      }
    })
    this.setDashboard(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authSubject.subscribe(state => {
        if (state) {
          this.router.navigate(['place-order']);
        } else {
          this.router.navigate(['home']);
        }
      });

      this.currentRoute = window.location.pathname;

      this.storage.get('jwt-token').then(async res => {
        if (res) {
          this.user = await res.user
        }
      })
    });
  }

  async presentLoading() {
    this.loaded = false;
    const loading = await this.loadingController.create({
      spinner: "lines",
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      animated: true,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.loaded = true;
    console.log('Loading dismissed!');
  }

  logout() {
    this.authService.logout();
  }

  onClickNav(event) {
    this.storage.get('jwt-token').then(async res=> {
      if (res) {
        this.user = await res.user
        console.log(res.user)
      }
    })
    
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

  openProfile(){
    this.storage.get('jwt-token').then(async res=> {
      if (res) {
        this.user = await res.user
        console.log(res.user)
      }
    })
    // this.router.navigateByUrl('/place-order', { skipLocationChange: false }).then(() => {
    this.router.navigate(['/profile']);
  // });
  }

  
}
