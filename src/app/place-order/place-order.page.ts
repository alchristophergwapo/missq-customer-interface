import { Component, OnInit } from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
import { AlertController, IonSlides } from "@ionic/angular";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

// import { LocationSelectPage } from "../location-select/location-select.page";

declare var google: any;

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
      MediaUrl: "../../assets/images/nanny.jpg",
    },
    {
      MediaUrl: "../../assets/images/nanny1.jpg",
    },
    {
      MediaUrl: "../../assets/images/nanny2.jpeg"
    }
  ];
  housekeeping: any = [
    {
      MediaUrl: "../../assets/images/housekeeping.jpg",
    },
    {
      MediaUrl: "../../assets/images/housekeeping1.jpg",
    },
    {
      MediaUrl: "../../assets/images/housekeeping2.jpg"
    }
  ];
  tutor: any = [
    {
      MediaUrl: "../../assets/images/tutor.jpg",
    },
    {
      MediaUrl: "../../assets/images/tutor1.jpg",
    },
    {
      MediaUrl: "../../assets/images/tutor2.jpg"
    }
  ];
  massage: any = [
    {
      MediaUrl: "../../assets/images/massage.jpg",
    },
    {
      MediaUrl: "../../assets/images/massage1.jpg",
    },
    {
      MediaUrl: "../../assets/images/massage2.jpg"
    }
  ];
  haircut: any = [
    {
      MediaUrl: "../../assets/images/haircut.jpg",
    },
    {
      MediaUrl: "../../assets/images/haircut1.jpg",
    },
    {
      MediaUrl: "../../assets/images/haircut2.jpg"
    }
  ];

  mySlideOptions = {
    pager: true
  };

  costs: any = {
    Nanny: 84,
    Housekeeping: 93,
    Tutor_Cum_Nanny: 150,
    Massage_Therapist: 500,
    Haircut: 100
  };

  totalCost: number;

  bookedData: Observable<any>;
  booked = new BehaviorSubject(null);

  constructor(private alertCtrl: AlertController, private router: Router) {
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
            this.totalCost = this.costs[this.segmentModel] * data.hours;
            if (data.hours && data.notes) {
              this.booked.next(data);
              if (this.booked.value) {
                console.log(this.booked);

                this.router.navigateByUrl("place-order/location-select");
              }
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
      this.totalCost = this.costs[this.segmentModel];
    }
  }

  segmentChanged(event) {
  }
}
