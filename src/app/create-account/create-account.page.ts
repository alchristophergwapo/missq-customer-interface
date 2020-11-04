import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, NgForm } from '@angular/forms';


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
      cpassword: '',
      selpic: '',
      idpic: '',
      idnum: ''
    };
  }

  register(myForm: FormsModule) {
    this.isSubmitted = true;
    console.log(this.data);
    console.log('Form');
    console.log(myForm);
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
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
  
    };
  
    reader.onerror = (error) => {
  
      //handle errors
  
    };
  };

  ngOnInit() {
  }

}
