import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ParkingDetailComponent } from './pages/parking-detail/parking-detail.component';
import { ContactFormComponent } from './pages/contact-form/contact-form/contact-form.component';

const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: 'parking-search', component: ParkingSearchComponent},
  {path: "signup", component: SignPageComponent, data: {isSignup: true}},
  {path: "signin", component: SignPageComponent, data: {isSignup: false}},
  {path: "userpage", component: UserPageComponent},
  {path: "parking/:cityName/:id", component: ParkingDetailComponent},
  {path: "contact-us", component: ContactFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
