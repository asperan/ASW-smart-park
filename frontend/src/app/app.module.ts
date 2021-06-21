import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VehicleTabComponent } from './pages/user-page/pills/vehicle-tab/vehicle-tab.component';
import { PaymentTabComponent } from './pages/user-page/pills/payment-tab/payment-tab.component';
import { StatisticsTabComponent } from './pages/user-page/pills/statistics-tab/statistics-tab.component';
import { NgStorageModule } from 'ng-storage-local';
import { PricePipe } from './pipes/prices.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ParkingDetailComponent } from './pages/parking-detail/parking-detail.component';
import { PricingDetailComponent } from './pages/parking-detail/pills/pricing-detail/pricing-detail.component';
import { SupportDetailComponent } from './pages/parking-detail/pills/support-detail/support-detail.component';
import { ContactFormComponent } from './pages/contact-form/contact-form/contact-form.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthGuardService } from './access-token/token-guard';
import { AuthInterceptor } from './access-token/auth-http-interceptor';
import { StatisticsDetailComponent } from './pages/parking-detail/pills/statistics-detail/statistics-detail.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    ParkingSearchComponent,
    SignPageComponent,
    UserPageComponent,
    VehicleTabComponent,
    PaymentTabComponent,
    StatisticsTabComponent,
    PricePipe,
    SearchbarComponent,
    ParkingDetailComponent,
    PricingDetailComponent,
    SupportDetailComponent,
    ContactFormComponent,
    StatisticsDetailComponent,
    HomepageComponent,
    PaymentPageComponent,
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
  providers: [
    MarkerService,
    PopupService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
