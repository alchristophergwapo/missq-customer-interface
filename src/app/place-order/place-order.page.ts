import { Component, OnInit } from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
import { AlertController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { MsqService } from "../api/services/service/msq-service.service";
import { AuthService } from '../api/services/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-place-order",
  templateUrl: "./place-order.page.html",
  styleUrls: ["./place-order.page.scss"]
})
export class PlaceOrderPage implements OnInit {
  // @ViewChild('nanny-s-location') locationInput: ElementRef;

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
    // private msqService: MsqService,
    // private authService: AuthService
  ) {}

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

  ngOnInit() {
    if (!this.totalCost) {
      this.totalCost = this.descriptions[this.segmentModel];
    }
    
  }

  segmentChanged(event) {
    this.segmentModel = event;
  }
}
