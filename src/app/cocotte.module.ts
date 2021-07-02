import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe, registerLocaleData  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';

import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WeekComponent } from './pages/week/week.component';
import { IngredientsComponent } from './pages/week/ingredients/ingredients.component';

import { CookieService } from 'ngx-cookie-service';
import { RootComponent } from './pages/root/root.component';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'week', component: WeekComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RootComponent,
    SettingsComponent,
    WeekComponent,
    IngredientsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [RootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [IngredientsComponent]
})
export class CocotteModule { }
