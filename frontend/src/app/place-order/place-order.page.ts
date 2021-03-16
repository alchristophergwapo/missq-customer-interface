import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Storage } from "@ionic/storage";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

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

  additionalCost: any = {
    Nanny: 1.666666666666667,
    Housekeeping: 1.666666666666667,
    TutorCumNanny: 2.5,
    MassageTherapist: 5
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
    private app: AppComponent,
    private storage: Storage
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
      subHeader: "Your input must be based on minute not hours. Thank You!",
      backdropDismiss: false,
      inputs: [
        // {
        //   name: "hours",
        //   placeholder: this.description[this.segmentModel],
        //   value: 1 + "hour and" + 30 + "minutes",
        //   type: "number"
        // },
        {
          name: "additional",
          placeholder: "Additional Minute/s",
          type: "number",
          // value: 0

        },
        // {
        //   name: "minutes",
        //   value: 30,
        // },
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
          handler: data => {
            // this.bookService();
          }
        },
        {
          text: "OK",
          handler: data => {
            Swal.fire({
              title: 'Do you want to save the changes? <br><br> Total Cost: ₱' + Math.round(this.costOfServie[this.segmentModel] + (data.additional * this.additionalCost[this.segmentModel])),
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Save`,
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                if (data.additional && data.notes) {
                  Swal.fire('Saved!', '', 'success')
                  this.totalCost =
                    this.costOfServie[this.segmentModel] + (data.additional * this.additionalCost[this.segmentModel]);
                  console.log(Math.round(this.totalCost));
                  const params = {
                    service_booking: this.segmentModel,
                    cost: Math.round(this.totalCost),
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
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })

          }
        }
      ]
    });
    await alert.present();
  }

  async haircutAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Reminder!",
      message: "Please indicate the number of heads.",
      inputs: [
        {
          name: "head",
          placeholder: this.description.Haircut,
          type: "number",
        },
        {
          name: "notes",
          placeholder: "Notes",
          type: "textarea",
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
          }
        },
        {
          text: "OK",
          handler: (data) => {
            Swal.fire({
              title: 'Do you want to save the changes? <br><br> Total Cost: ₱' + Math.round(this.costOfServie.Haircut * data.head),
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Save`,
              denyButtonText: `Don't save`,
            }).then((result) => {
              if (result.isConfirmed) {
                /* Read more about isConfirmed, isDenied below */
                if (data.head && data.notes) {
                  Swal.fire('Saved!', '', 'success')
                  this.totalCost = this.costOfServie.Haircut * data.head;
                  console.log(Math.round(this.totalCost));
                  const params = {
                    service_booking: this.segmentModel,
                    cost: Math.round(this.totalCost),
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
                  this.inputErrorHaircut();
                }
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })

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
          text: "Cancel",
          role: "cancel",
          handler: () => {
          }
        },
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
  async inputErrorHaircut() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Error!",
      message: "Please fill up the needed information.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
          }
        },
        {
          text: "OK",
          handler: () => {
            this.haircutAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  segmentChanged(event) {
    this.segmentModel = event;
  }

  // updateUser(){
  //   this.storage.get('jwt-token').then(async res=> {
  //     if (res) {
  //       console.log(res);
        
  //       // this.app.user.name = await res.user.name;
  //       // console.log(res.user);
  //     }
  //   })
  // }

}