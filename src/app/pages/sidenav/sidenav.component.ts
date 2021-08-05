import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;

  constructor(private router: Router, private cookieService: CookieService) {}

  IsLogin() {
    return window.location.href.includes("login");
  }

  GoToWeek(){
    this.router.navigate(['/week']);  // define your component where you want to go
  }

  GoToSettings(){
      this.router.navigate(['/settings']);  // define your component where you want to go
  }

  Logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey == 'undefined' || !sessionKey)
      this.router.navigate(['/login']);
  }

}
