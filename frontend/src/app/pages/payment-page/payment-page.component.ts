import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router , private parkingService: ParkingSearchService) { }

  faCalendar = faCalendar;
  faMinus = faMinus;
  faPlus = faPlus;

  isPayed = false;

  private cityId: string = "";
  private parkingId: number = -1;

  parking: Parking | undefined;

  parkingName: string = "";
  currentDate: string = "";

  private currentHours = 0;
  private currentMinutes = 0;
  private upperBound = 24;
  private lowerBound = 0;

  endDateHours: string = "";
  endDateMinutes: string = "";
  hours = 0;
  minutes = 0;
  
  price = 0;

  ngOnInit(): void {
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

    this.currentHours = today.getHours();
    this.currentMinutes = today.getMinutes();

    this.upperBound = this.findTimeUpperBound();
    this.lowerBound = this.findTimeLowerBound();

    this.currentDate = mm + '/' + dd + '/' + yyyy;
    this.updateEndDateTime();
  }

  private makeEndDateTime(time: number) {
    return String(time < 10 ? "0" + time : time);
  }

  private updateEndDateTime() {
    if(this.currentHours > this.upperBound) {
      this.endDateHours = "Free until 00";
      this.endDateMinutes = this.makeEndDateTime(0);
    } else {
      const hours = this.currentHours + this.hours
      const minutes = this.currentMinutes + this.minutes;
      this.endDateHours = this.makeEndDateTime(hours <= 24 ? hours : 24);
      if(hours < this.upperBound) {
        this.endDateMinutes = this.makeEndDateTime(minutes < 60 ? minutes : 0);
      } else {
        this.endDateMinutes = this.makeEndDateTime(0);
      }
    }    
  }

  private loadParking() {
    this.parkingService.getParkingByCityNameAndParkingId(this.cityId, this.parkingId).subscribe(parking => {
      this.parking = parking;
      this.parkingName = parking.detail.name;
      this.parseCurrentDate();
    }, err => {
      this.router.navigate(['parking-search']);
    });
  }

  addHours(ammount: number) {
    if (this.isBetween(this.hours + ammount, 0, 10) && this.isHoursInBounds(this.hours + ammount)) {
      this.hours += ammount;
      this.updateEndDateTime();
      this.updatePrice();
    }
  }

  addMinutes(ammount: number) {
    const isNewMonutesInBounds = this.isBetween(this.minutes + ammount, 0, 45);
    const isHoursInBounds = this.isHoursInBounds(this.hours);
    const isMinutesInBounds = this.isMinutesInBounds(this.minutes + ammount);
    
    if (isNewMonutesInBounds && isHoursInBounds  && isMinutesInBounds) {
      this.minutes += ammount;
      this.updateEndDateTime();
      this.updatePrice();
    }
  }

  private isBetween(num: number, start: number, end: number) {
    return num >= start && num <= end;
  }

  private updatePrice() {
    if(this.parking) {
      const hourlyPrice = this.parking.pricing.price;
      const hoursPrice = hourlyPrice * this.hours;
      const minutesPrice = hourlyPrice / 60 * this.minutes;
      const a = (hoursPrice + minutesPrice);
      this.price = Math.floor(a * 100) / 100;
    }
  }

  private findTimeUpperBound() {
    if(this.parking) {
      return this.parking.pricing.hours.lastIndexOf("1") + 1;
    }
    return 24;
  }

  private findTimeLowerBound() {
    if(this.parking) {
      return this.parking?.pricing.hours.indexOf("1");
    }
    return 0;
  }

  private isHoursInBounds(offset: number) {
    return this.currentHours + offset >= this.lowerBound && this.currentHours + offset <= this.upperBound;
  }

  private isMinutesInBounds(offset: number) {
    return this.currentMinutes + offset >= 0 && this.currentMinutes + offset <= 75;
  }

  onPayment() {
    const price = this.price;
    const parkingEndTime = this.endDateHours + ":" + this.endDateMinutes;
    // TODO handle payment logic....
    this.isPayed = true;
  }

  goBack() {
    this.router.navigate(['parking-search']);
  }

}
