import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {

  segmentModel = "Nanny";

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

  costOfServie: any = {
    Nanny: 250,
    Housekeeping: 250,
    TutorCumNanny: 325,
    MassageTherapist: 500,
    Haircut: 250
  };

  description: any = {
    Nanny: 'Hours of service',
    Housekeeping: 'Hours of service',
    TutorCumNanny: 'Hours of service',
    MassageTherapist: 'Hours of service',
    Haircut: 'Count of heads'
  };

  totalCost: number;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private app: AppComponent
    // private msqService: MsqService,
    // private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.totalCost) {
      this.totalCost = this.costOfServie[this.segmentModel];
    }

    this.app.dashboard = true;
  }

  async bookService() {
    const alert = await this.alertCtrl.create({
      header: this.segmentModel,
      subHeader: "Please fill up the needed information!",
      backdropDismiss: false,
      inputs: [
        {
          name: "hours",
          placeholder: this.description[this.segmentModel],
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
          handler: data => { }
        },
        {
          text: "Next",
          handler: data => {
            if (data.hours && data.notes) {
              this.totalCost =
                this.costOfServie[this.segmentModel] * data.hours;
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

}
