import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CountryCodes } from "../countryCodeModel";

import { AuthService } from "../api/services/auth/auth.service";
import { Router } from "@angular/router";
import { User } from "../api/models/user";

import { Camera, CameraOptions, PictureSourceType } from "@ionic-native/camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const STORAGE_KEY = 'my_images';

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"]
})
export class CreateAccountPage implements OnInit {
  public user: User;
  isSubmitted = false;
  dataList: Array<CountryCodes> = [];
  selfie: any;
  idPic: any;

  capturedSnapURL: string;
  passwordMatch: Boolean = null;

  images: Array<any> = [];

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  public type = 'password';
  public type1 = 'password';
  public showPass = false;
  public showPass1 = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private camera: Camera,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.user = {
      name: "",
      address: "",
      code: "",
      phone: null,
      email: "",
      birth_date: null,
      password: "",
      confirm: "",
      picture: "",
      id_image: "",
      id_number: null
    };

    fetch('assets/country-code.json').then(async res => {
      let result = await res.json();
      this.dataList = result.data;

    })
  }
  
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  showPasswordConfirm() {
    this.showPass1 = !this.showPass1;
    if (this.showPass1) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }

  async register(form) {
    const loading = await this.loadingController.create({
      message: 'Creating account...',
    });
    await loading.present();

    // form.value['picture'] = this.selfie;
    // form.value['id_image'] = this.idPic;

    // console.log("Updated form: ", form.value);

    // this.authService.register(form.value, { picture: this.selfie, id_image: this.idPic }, { picture: this.selfie, id_image: this.idPic }).subscribe(response => {
    //   if (response) {
    //     this.isSubmitted = true;
    //     this.router.navigateByUrl("login");
    //   }
    // });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    })

    toast.present();
  }

  noSubmit(e) {
    e.preventDefault();
  }

  loadImageFromDevice(event, type) {
    if (event.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
    let file = event.target.files[0];
    if (type == 'selfie') {
      this.selfie = file;
      // if (this.platform.is('cordova')) {
      //   this.camera.getPicture(this.cameraOptions).then((imageData) => {
      //     let image = 'data:image/jpeg;base64,' + imageData;
      //     this.capturedSnapURL = image;
      //     console.log(image);

      //   }, (err) => {

      //     console.log(err);
      //     // Handle error
      //   });
      // }
    } else {
      this.idPic = file;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
    };
    reader.onerror = error => {
      //handle errors
    };
  }

  confirmPassword(event) {
    const password = this.user.password;
    console.log(password);

    if (event.target.value == password) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  validatePassword(event) {
    const password = {
      length: 6,
      uppercase: /[A-Z]/g,
      lowercase: /[a-z]/g,
      number: /[0-9 ]/g
    }

    document.getElementById("message").style.display = "block";

    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // Validate lowercase letters
    if (event.target.value.match(password.lowercase)) {
      
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    if (event.target.value.match(password.uppercase)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    if (event.target.value.match(password.number)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (event.target.value.length >= password.length) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  onBlur(event) {
    document.getElementById("message").style.display = "none"; 
  }
}
