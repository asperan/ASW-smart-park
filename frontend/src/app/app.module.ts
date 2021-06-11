import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VehicleTabComponent } from './pages/user-page/pills/vehicle-tab/vehicle-tab.component';
import { PaymentTabComponent } from './pages/user-page/pills/payment-tab/payment-tab.component';
import { StatisticsTabComponent } from './pages/user-page/pills/statistics-tab/statistics-tab.component';
import { NgStorageModule } from 'ng-storage-local';
import { PricePipe } from './pipes/prices.pipe';
import { NotificationIconComponent } from "./notifications/notification-icon/notification-icon.component";
import { NotificationPageComponent } from "./notifications/notification-page/notification-page.component";
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ParkingDetailComponent } from './pages/parking-detail/parking-detail.component';
import { PricingDetailComponent } from './pages/parking-detail/pills/pricing-detail/pricing-detail.component';
import { SupportDetailComponent } from './pages/parking-detail/pills/support-detail/support-detail.component';
import { ContactFormComponent } from './pages/contact-form/contact-form/contact-form.component';
import { AuthGuardService } from './access-token/token-guard';
import { AuthInterceptor } from './access-token/auth-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ParkingSearchComponent,
    SignPageComponent,
    UserPageComponent,
    VehicleTabComponent,
    PaymentTabComponent,
    StatisticsTabComponent,
    PricePipe,
    NotificationIconComponent,
    NotificationPageComponent,
    SearchbarComponent,
    ParkingDetailComponent,
    PricingDetailComponent,
    SupportDetailComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgStorageModule
  ],
  providers: [AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
