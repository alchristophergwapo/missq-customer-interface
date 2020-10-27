import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  data: any;
  isSubmitted = false;

  constructor() {
    this.data = {
      name: '',
      address: '',
      phone: '',
      email: '',
      date: '',
      password: '',
      cpassword: ''
    };
  }

  register(myForm: FormsModule) {
    this.isSubmitted = true;
    console.log('Form');
    console.log(myForm);
  }

  noSubmit(e) {
    e.preventDefault();
  }

  ngOnInit() {
  }

}
