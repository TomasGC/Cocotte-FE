import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PullToRefreshModule} from '@piumaz/pull-to-refresh';

import { AngularMaterialModule } from './modules/angular-material.module';
import { SharedModules } from './modules/shared.module';

import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WeekComponent } from './pages/week/week.component';
import { IngredientsComponent } from './pages/week/ingredients/ingredients.component';

import { CookieService } from 'ngx-cookie-service';
import { RootComponent } from './pages/root/root.component';

import { RecipesComponent } from './pages/week/recipes/recipes.component';
import { DaysComponent } from './pages/week/days/days.component';

@NgModule({
  declarations: [
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RootComponent,
    SettingsComponent,
    WeekComponent,
    IngredientsComponent,
    RecipesComponent,
    DaysComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModules,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    PullToRefreshModule
  ],
  providers: [HttpClient, CookieService, DatePipe],
  bootstrap: [RootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [IngredientsComponent, RecipesComponent, DaysComponent]
})
export class CocotteModule { }
