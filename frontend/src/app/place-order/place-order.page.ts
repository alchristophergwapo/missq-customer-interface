import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {

  segmentModel = "Nanny";

  // @ViewChild(IonSlides) slides: IonSlides;

  nanny: any = [
    {
      MediaUrl: "../../assets/images/nanny.jpg"
    },
    {
      MediaUrl: "../../assets/images/nanny1.jpg"
    },
    {
      MediaUrl: "../../assets/images/nanny2.jpeg"
    }
  ];
  housekeeping: any = [
    {
      MediaUrl: "../../assets/images/housekeeping.jpg"
    },
    {
      MediaUrl: "../../assets/images/housekeeping1.jpg"
    },
    {
      MediaUrl: "../../assets/images/housekeeping2.jpg"
    }
  ];
  tutor: any = [
    {
      MediaUrl: "../../assets/images/tutor.jpg"
    },
    {
      MediaUrl: "../../assets/images/tutor1.jpg"
    },
    {
      MediaUrl: "../../assets/images/tutor2.jpg"
    }
  ];
  massage: any = [
    {
      MediaUrl: "../../assets/images/massage.jpg"
    },
    {
      MediaUrl: "../../assets/images/massage1.jpg"
    },
    {
      MediaUrl: "../../assets/images/massage2.jpg"
    }
  ];
  haircut: any = [
    {
      MediaUrl: "../../assets/images/haircut.jpg"
    },
    {
      MediaUrl: "../../assets/images/haircut1.jpg"
    },
    {
      MediaUrl: "../../assets/images/haircut2.jpg"
    }
  ];

  mySlideOptions = {
    pager: true
  };

  descriptions: any = {
    Nanny: 84,
    Housekeeping: 93,
    TutorCumNanny: 150,
    MassageTherapist: 500,
    Haircut: 100
  };

  totalCost: number;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private app: AppComponent,
    private storage: Storage
    // private msqService: MsqService,
    // private authService: AuthService
  ) {}
  ngOnInit() {
    if (!this.totalCost) {
      this.totalCost = this.descriptions[this.segmentModel];
    }

    this.app.dashboard = true;
  }

  async bookService() {
    const alert = await this.alertCtrl.create({
      header: this.segmentModel,
      subHeader: "Please fill up the needed information!",
      inputs: [
        {
          name: "hours",
          placeholder: "Hours of service",
          type: "number"
        },
        {
          name: "notes",
          placeholder: "Notes",
          type: "textarea"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {}
        },
        {
          text: "Next",
          handler: data => {
            if (data.hours && data.notes) {
              this.totalCost =
                this.descriptions[this.segmentModel] * data.hours;
              const params = {
                service_booking: this.segmentModel,
                cost: this.totalCost,
                notes: data.notes
              };
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  bookedData: JSON.stringify(params)
                }
              };
              this.router.navigate(
                ["place-order/location-select"],
                navigationExtras
              );
            } else {
              this.inputError();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async inputError() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Error!",
      message: "Please fill up the needed information.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.bookService();
          }
        }
      ]
    });

    await alert.present();
  }

 

  segmentChanged(event) {
    this.segmentModel = event;
  }

  updateUser(){
    this.storage.get('jwt-token').then(async res=> {
      if (res) {
        this.app.user.name = await res.user.name;
        console.log(res.user);
      }
    })
  }

}
