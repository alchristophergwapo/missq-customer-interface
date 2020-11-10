import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../api/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  data: any;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(form) {
    this.isSubmitted = true;
    this.authService.register(form.value).subscribe((response) => {
      if (response.user) {
        this.router.navigateByUrl('login');
      }
    });
  }

  ngOnInit() {
  }

}
