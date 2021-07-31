import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PullToRefreshService } from '@piumaz/pull-to-refresh';

import { CookieService } from 'ngx-cookie-service';
import { BaseResponse } from 'src/app/classes/base/responses';
import { LanguageType } from 'src/app/classes/configuration/dataConfig';
import { IsEmpty } from 'src/app/classes/tools';
import { GetUserResponse } from 'src/app/classes/users/responses';
import { DailyMeals, DayOfWeek, Users } from 'src/app/classes/users/users';
import { MealType } from 'src/app/classes/weeks/weeks';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  Users = Users;
  loading: boolean = true;
  user: Users = null;
  displayedColumns: string[] = ['day', 'breakfast', 'lunch', 'dinner'];
  dataSource: MatTableDataSource<DailyMeals>;
  mealTypes: string[] = Object.keys(MealType);
  languageTypes = LanguageType;

  name = environment.application.name;
  angular = environment.application.angular;
  fontawesome = environment.application.fontawesome;
  color: string;
  background: ThemePalette = undefined;

  constructor(private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router,
    private pullToRefreshService: PullToRefreshService,
    public translate: TranslateService) {
      pullToRefreshService.refresh$().subscribe(() => {
        this.Reload();

        setTimeout(() => {
          console.log('dismiss by service');
          pullToRefreshService.dismiss();
        }, 1000);

      });

      document.addEventListener('pull-to-refresh', () => {
        this.Reload();
      });
    }

  ngOnInit() {
    var sessionKey = this.cookieService.get('sessionKey');
    if (typeof sessionKey == 'undefined' || !sessionKey)
      this.router.navigate(['/login']);

    this.Reload();
  }

  Reload() {
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

        var label = new DailyMeals();
        label.day = DayOfWeek.None;
        label.meals = new Array<KeyValue<MealType, boolean>>();
        label.meals.push({key: MealType.Breakfast, value: false});
        label.meals.push({key: MealType.Lunch, value: false});
        label.meals.push({key: MealType.Dinner, value: false});

        this.user.dailyMeals.unshift(label);

        this.dataSource = new MatTableDataSource(this.user.dailyMeals);

        this.loading = false;
      },
      error => {
        console.error('Get the current week not succeeded.');
        this.loading = false;
      });
  }

  ChangeLanguage(language): void {
    this.user.language = language;
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  IsValid() : boolean {
    if (IsEmpty(this.user.login))
      return false;
    if (IsEmpty(this.user.password))
      return false;
    if (IsEmpty(this.user.timeBetweenMeals))
      return false;
    if (IsEmpty(this.user.dailyMeals) || this.user.dailyMeals.length == 0)
      return false;

    return true;
  }

  Validate() : void {
    var request = { ...this.user };
    request.dailyMeals.splice(0, 1);

    this.cookieService.set('language', this.user.language.toString());

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
