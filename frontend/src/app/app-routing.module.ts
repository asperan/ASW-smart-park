import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';

const routes: Routes = [
  {path: "", component: AppComponent}, 
  {path: "signup", component: SignPageComponent, data: {isSignup: true}},
  {path: "signin", component: SignPageComponent, data: {isSignup: false}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
