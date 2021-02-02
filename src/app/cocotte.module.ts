import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';

import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WeekComponent } from './pages/week/week.component';

import { CookieService } from 'ngx-cookie-service';
import { RootComponent } from './pages/root/root.component';

@NgModule({
  declarations: [
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RootComponent,
    SettingsComponent,
    WeekComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '/#/login', component: LoginComponent },
      { path: '/#/home', component: HomeComponent },
      { path: '/#/settings', component: SettingsComponent },
      { path: '/#/week/ingredients', component: WeekComponent }
    ])
  ],
  providers: [CookieService],
  bootstrap: [RootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CocotteModule { }
