import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { VehicleTabComponent } from './pages/user-page/vehicle-tab/vehicle-tab.component';
import { PaymentTabComponent } from './pages/user-page/payment-tab/payment-tab.component';
import { StatisticsTabComponent } from './pages/user-page/statistics-tab/statistics-tab.component';
import { NgStorageModule } from 'ng-storage-local';
import { PricePipe } from './pipes/prices.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

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
      PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
