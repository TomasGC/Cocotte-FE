import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;

  constructor() { }

  ngOnInit() {
  }

}
