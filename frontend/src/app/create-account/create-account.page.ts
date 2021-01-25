import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../api/services/auth.service';
import { User } from '../api/models/user';
import { CountryCodes } from '../api/models/country-codes';
import { PhotoService } from '../api/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource, Capacitor, Plugins } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-create-acount',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAcountPage implements OnInit {

  public user: User;
  isSubmitted = false;
  dataList: Array<CountryCodes> = [];
  selfie: any;
  idPic: any;

  passwordMatch: Boolean = null;

  public type = 'password';
  public type1 = 'password';
  public showPass = false;
  public showPass1 = false;

  isLoading: boolean = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private photoService: PhotoService,
    private platform: Platform,
    private sanitizer: DomSanitizer
  ) {
  }

  async ngOnInit() {
    this.user = {
      name: "Geneva Rivas",
      address: "Talamban",
      code: "+63",
      phone: 9482850377,
      email: "genevaxoxorivas99@gmail.com",
      birth_date: new Date('06/12/1999'),
      password: "jhenRivas1999",
      confirm: "jhenRivas1999",
      picture: "",
      id_image: "",
      id_number: 18106143
    };

    fetch('assets/country-code.json').then(async res => {
      let result = await res.json();
      this.dataList = result.data;

    })

    await this.photoService.loadSaved();

  }

  async takeSelfie() {
    let s = await this.photoService.addNewToGallery();
    // this.selfie = this.photoService.photo; 

    console.log("Selfie: ", s);

    if (s !== null) {
      this.user.picture = this.photoService.photo.filepath

      console.log(this.user.picture);
      
    }

  }

  deleteImage(photo, position) {
    this.photoService.deletePicture(photo, position);
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

    await this.present();

    form.value.id_image = this.idPic.name;

    this.authService.register(form.value, this.idPic, this.selfie).subscribe(response => {
      if (response) {
        this.isSubmitted = true;
        this.dismiss();
        this.router.navigateByUrl("login");
      }
    });
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Creating account...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(async () => {
      console.log('dismissed')
      await this.presentToast('Account Created!')
    });
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
    let file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();

    reader.onload = () => {

      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))])

      let blobURL: string = URL.createObjectURL(blob)

      // console.log(blobURL);
      this.idPic = file;
      console.log(this.idPic);

    };
    reader.onerror = error => {
      //handle errors
    };

    reader.readAsDataURL(file);

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

  async getPicture(type: String) {
    
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      });
   
      this.selfie = this.b64toBlob(image.base64String, `image/${image.format}`);
      this.user.picture = `${Date.now()}.${image.format}`

      console.log(this.selfie);
      
      this.authService.uploadImage(this.selfie, image.format).subscribe(()=>{

      })

  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
