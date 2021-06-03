import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ParkingSearchComponent } from './pages/parking-search/parking-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VehicleTabComponent } from './pages/user-page/vehicle-tab/vehicle-tab.component';
import { PaymentTabComponent } from './pages/user-page/payment-tab/payment-tab.component';
import { StatisticsTabComponent } from './pages/user-page/statistics-tab/statistics-tab.component';
import { NgStorageModule } from 'ng-storage-local';
import { PricePipe } from './pipes/prices.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ParkingDetailComponent } from './pages/parking-detail/parking-detail.component';
import { PricingDetailComponent } from './pages/parking-detail/pills/pricing-detail/pricing-detail.component';

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
    SearchbarComponent,
    ParkingDetailComponent,
    PricingDetailComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
