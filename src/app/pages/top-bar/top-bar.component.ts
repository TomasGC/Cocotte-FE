import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = 'Cocotte';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  GoToHome(): void {
    this.router.navigate(['/home']);
  }
}
