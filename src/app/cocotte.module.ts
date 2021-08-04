import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';

import { PullToRefreshModule } from '@piumaz/pull-to-refresh';

import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WeekComponent } from './pages/week/week.component';
import { IngredientsComponent } from './pages/week/ingredients/ingredients.component';

import { CookieService } from 'ngx-cookie-service';
import { RootComponent } from './pages/root/root.component';

import { RecipesComponent } from './pages/week/recipes/recipes.component';
import { DaysComponent } from './pages/week/days/days.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { WeekIngredientsComponent } from './pages/week/week-ingredients/week-ingredients.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { RoutingModule } from './modules/routing.module';
import { TranslationModule } from './modules/translation.module';

@NgModule({
  declarations: [
    SidenavComponent,
    LoginComponent,
    RootComponent,
    SettingsComponent,
    WeekComponent,
    IngredientsComponent,
    RecipesComponent,
    DaysComponent,
    WeekIngredientsComponent
  ],
  imports: [
    AngularMaterialModule,
    RoutingModule,
    TranslationModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule,
    PullToRefreshModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [RootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [IngredientsComponent, RecipesComponent, DaysComponent]
})

export class CocotteModule { }
