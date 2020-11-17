import { Component, OnInit } from '@angular/core';
import { AuthService } from "../api/services/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  login(form) {
    // console.log(form.value);
    this.authService.login(form.value).subscribe((res) => {
      if (res.status == 200) {
        this.router.navigateByUrl('place-order');
      } else {
        alert(form.value + ' is not found!');
      }
    });
  }

  ngOnInit() {
  }

}
