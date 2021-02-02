import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;


  constructor(private router: Router) {}

  gotoSettings(){
      this.router.navigate(['/settings']);  // define your component where you want to go
  }

  gotoWeek(){
    this.router.navigate(['/week']);  // define your component where you want to go
}

  ngOnInit() {
  }

}
