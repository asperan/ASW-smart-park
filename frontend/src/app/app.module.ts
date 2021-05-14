import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VehicleTabComponent } from './pages/user-page/vehicle-tab/vehicle-tab.component';
import { PaymentTabComponent } from './pages/user-page/payment-tab/payment-tab.component';
import { StatisticsTabComponent } from './pages/user-page/statistics-tab/statistics-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    SignPageComponent,
    UserPageComponent,
    VehicleTabComponent,
    PaymentTabComponent,
    StatisticsTabComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
