import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginRequest } from '../../classes/users/requests';
import { LoginResponse } from '../../classes/users/responses';
import { BaseResponse } from '../../classes/base/responses';

import { UsersService } from '../../services/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { IsEmpty } from 'src/app/classes/tools';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Login';
  events = null;
  request: LoginRequest = new LoginRequest();
  isCreation: boolean;
  revealPassword: boolean;
  revealCreationKey: boolean;

  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router) {
      this.request = new LoginRequest();
      this.isCreation = false;
    }

  public ngOnInit(): void {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey != 'undefined' && sessionKey)
      this.router.navigate(['/home']);
  }

  IsValid() {
    if (IsEmpty(this.request.login))
      return false;
    if (IsEmpty(this.request.password))
      return false;
    if (this.isCreation && IsEmpty(this.request.creationAllowanceKey))
      return false;

    return true;
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

        this.router.navigate(['/week']);
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
}
