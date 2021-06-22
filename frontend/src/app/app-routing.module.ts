import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NotificationPageComponent } from './notifications/notification-page/notification-page.component';
import { ParkingDetailComponent } from './pages/parking-detail/parking-detail.component';
import { ContactFormComponent } from './pages/contact-form/contact-form/contact-form.component';
import { AuthGuardService } from './access-token/token-guard';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: 'parking-search', component: ParkingSearchComponent, canActivate: [AuthGuardService]},
  {path: "signup", component: SignPageComponent, data: {isSignup: true}},
  {path: "signin", component: SignPageComponent, data: {isSignup: false}},
  {path: "notifications", component: NotificationPageComponent},
  {path: "userpage", component: UserPageComponent, canActivate: [AuthGuardService]},
  {path: "parking/:cityName/:id", component: ParkingDetailComponent, canActivate: [AuthGuardService]},
  {path: "contact-us", component: ContactFormComponent, canActivate: [AuthGuardService]},
  {path: "payment/:cityName/:id", component: PaymentPageComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
