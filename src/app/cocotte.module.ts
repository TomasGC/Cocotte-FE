import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
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
import { RecipesComponent } from './pages/week/recipes/recipes.component';
import { DaysComponent } from './pages/week/days/days.component';

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
    IngredientsComponent,
    RecipesComponent,
    DaysComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [RootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [IngredientsComponent, RecipesComponent, DaysComponent]
})
export class CocotteModule { }
