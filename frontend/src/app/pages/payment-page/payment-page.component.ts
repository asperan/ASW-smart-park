import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private parkingService: ParkingSearchService) { }

  faCalendar = faCalendar;

  private cityId: string = "";
  private parkingId: number = -1;

  parking: Parking | undefined;

  parkingName: string = "";
  currentDate: string = "";

  ngOnInit(): void {
    this.parseCurrentDate();
    this.route.params.subscribe(params => {
      this.cityId = params['cityName'];
      this.parkingId = params['id'];

      this.loadParking();
    });
  }

  private parseCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    this.currentDate = mm + '/' + dd + '/' + yyyy;
  }

  private loadParking() {
    this.parkingService.getParkingByCityNameAndParkingId(this.cityId, this.parkingId).subscribe(parking => {
      this.parking = parking;
      this.parkingName = parking.detail.name;
    });
  }

}
