import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NotificationPageComponent } from './notifications/notification-page/notification-page.component';

const routes: Routes = [
  {path: "", component: AppComponent}, 
  {path: 'parking-search', component: ParkingSearchComponent},
  {path: "signup", component: SignPageComponent, data: {isSignup: true}},
  {path: "signin", component: SignPageComponent, data: {isSignup: false}},
  {path: "userpage", component: UserPageComponent},
  {path: "notifications", component: NotificationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
