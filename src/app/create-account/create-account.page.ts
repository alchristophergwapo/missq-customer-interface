import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../services.service";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
// import { ConfirmedValidatorDirective } from '../confirmed-validators.directive';
import { CountryCodes } from "../countryCodeModel";

import { AuthService } from "../api/services/auth/auth.service";
import { Router } from "@angular/router";
import { User } from "../api/models/user";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"]
})
export class CreateAccountPage implements OnInit {
  public user: User;
  isSubmitted = false;
  dataList: Array<CountryCodes> = [];

  public type = 'password';
  public type1 = 'password';
  public showPass = false;
  public showPass1 = false;

  constructor(
    private authService: AuthService,
    private router: Router
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
  register(form) {
    this.isSubmitted = true;
    this.authService.register(form.value).subscribe(response => {
      if (response) {
        this.isSubmitted = true;
        this.router.navigateByUrl("login");
      }
    });
  }

  noSubmit(e) {
    e.preventDefault();
  }
  loadImageFromDevice(event) {
    const file = event.target.files[0];
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
}
