import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponse } from 'src/app/classes/base/responses';
import { IsEmpty } from 'src/app/classes/tools';
import { GetUserResponse } from 'src/app/classes/users/responses';
import { DayMealsSchedule, DayOfWeek, Users } from 'src/app/classes/users/users';
import { MealType } from 'src/app/classes/weeks/weeks';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loading: boolean = true;
  user: Users = null;
  displayedColumns: string[] = ['day', 'breakfast', 'lunch', 'dinner'];
  dataSource: MatTableDataSource<DayMealsSchedule>;
  mealTypes: string[] = Object.keys(MealType);

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;
  color: string;
  background: ThemePalette = undefined;

  constructor(private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey == 'undefined' || !sessionKey)
      this.router.navigate(['/login']);

    this.usersService.Get().subscribe(
      data => {
        let response = Object.assign(new GetUserResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while getting the current week.' + response.message);
          this.loading = false;
          return;
        }

        this.user = response.user;
        this.user.password = this.cookieService.get('password');

        this.mealTypes = this.mealTypes.slice(this.mealTypes.length / 2);

        var label = new DayMealsSchedule();
        label.day = DayOfWeek.None;
        label.meals = new Array<KeyValue<MealType, boolean>>();
        label.meals.push({key: MealType.Breakfast, value: false});
        label.meals.push({key: MealType.Lunch, value: false});
        label.meals.push({key: MealType.Dinner, value: false});

        this.user.dayMealsSchedule.unshift(label);

        this.dataSource = new MatTableDataSource(this.user.dayMealsSchedule);

        this.loading = false;
      },
      error => {
        console.error('Get the current week not succeeded.');
        this.loading = false;
      });
  }

  IsValid() : boolean {
    if (IsEmpty(this.user.login))
      return false;
    if (IsEmpty(this.user.password))
      return false;
    if (IsEmpty(this.user.timeBetweenMeals))
      return false;
    if (IsEmpty(this.user.dayMealsSchedule) || this.user.dayMealsSchedule.length == 0)
      return false;

    return true;
  }

  Validate() : void {
    var request = { ...this.user };
    request.dayMealsSchedule.splice(0, 1);

    this.usersService.Update(request).subscribe(
      data => {
        let response = Object.assign(new BaseResponse(), data);
        if(!response.success) {
          console.error('Something went wrong while updating the user.' + response.message);
          return;
        }
      },
      error => {
        console.error('Update the user did not succeed.');
      });
  }
}
