import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginRequest } from '../../classes/users/requests';
import { LoginResponse } from '../../classes/users/responses';
import { BaseResponse } from '../../classes/base/responses';

import { UsersService } from '../../services/users/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Login';
  events = null;
  request: LoginRequest;
  isCreation: boolean;

  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router) {
      this.request = new LoginRequest();
      this.isCreation = false;
    }

  Login() {
    this.usersService.Login(this.request).subscribe(
      data => {
        let response = Object.assign(new LoginResponse(), data);
        if(!response.success) {
          console.error('Something went wrong during login.');
          return;
        }

        console.log('Logged In.');

        this.cookieService.set('sessionKey', response.session.key);
        this.cookieService.set('login', response.user.login);
        this.cookieService.set('password', response.user.password);

        this.router.navigate(['/home']);
      },
      error => {
        console.error('Not logged.');
      });
  }

  Create() {
    this.usersService.Create(this.request).subscribe(
      data => {
        let response = Object.assign(new BaseResponse(), data);
        if(!response.success) {
          console.error('Something went wrong during account creation.');
          return;
        }

        console.log('Account creation success.');

        this.Login();
      },
      error => {
        console.error('Not logged');
      });
  }

  public ngOnInit(): void {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey != 'undefined' && sessionKey)
      this.router.navigate(['/home']);
  }
}
