import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";
import { SettingsComponent } from "../pages/settings/settings.component";
import { WeekComponent } from "../pages/week/week.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'week', component: WeekComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [
    HttpClientModule,
    RouterModule
  ]
})

export class RoutingModule {
  constructor() {}
}
