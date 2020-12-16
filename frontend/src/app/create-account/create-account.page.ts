import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../api/services/auth.service';
import { User } from '../api/models/user';
import { CountryCodes } from '../api/models/country-codes';
import { PhotoService } from '../api/services/photo.service';

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
  ) { 
  }

  ngOnInit() {
    this.user = {
      name: "Christopher Alonzo",
      address: "Talamban",
      code: "+63",
      phone: 9458562899,
      email: "toper@gmail.com",
      birth_date: new Date('09/13/1997'),
      password: "Toper@123",
      confirm: "Toper@123",
      picture: "",
      id_image: "",
      id_number: 18106145
    };

    fetch('assets/country-code.json').then(async res => {
      let result = await res.json();
      this.dataList = result.data;

    })
  }

  async takeSelfie() {
    let selfPic = await this.photoService.addNewToGallery();
    if (selfPic) {
      this.selfie = selfPic;

      console.log(this.selfie.webviewPath);
      
      this.user.picture = this.selfie.filepath
    }
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
    
    this.present();

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
    return await this.loadingController.dismiss().then(() => {
      console.log('dismissed')
      this.presentToast('Account Created!')
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
}
