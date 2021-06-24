import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { Parking, ParkingPricing, ParkingSearchService } from 'src/app/services/parking-search.service';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.css']
})
export class ParkingDetailComponent implements OnInit {

  pills = ['pricing', 'statistics', 'support']
  currentPill = 'pricing';

  imageUrl: string | undefined;

  private cityName: string | undefined;
  parkingId: number | undefined;

  private weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  pricings: Pricing[] = [];

  parkingName: string | undefined;
  parkingAddress: string | undefined;
  parkingType: string | undefined;
  parkingsAvailable: number | undefined;

  faCar = faCar;

  constructor(private route: ActivatedRoute, private parkingSearchService: ParkingSearchService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['cityName'];
      this.parkingId = params['id'];

      if (this.cityName && this.parkingId) {
        this.parkingSearchService.getParkingByCityNameAndParkingId(this.cityName, this.parkingId).subscribe((parking: Parking) => {
          this.parkingName = parking.detail.name;
          this.parkingAddress = parking.detail.address;
          this.parkingType = parking.detail.type;
          this.parkingsAvailable = parking.parkingSpots.length - parking.parkingSpots.filter(p => p.occupied).length;
          this.pricings = this.parsePricings(parking);
          if (parking.detail.imageUrl) {
            this.imageUrl = parking.detail.imageUrl;
          }
        });
      }
    });
  }

  private parsePricings(parking: Parking): Pricing[] {
    const pricings: Pricing[] = [];
    const pricingMask = parking.pricing.days.split('');

    const freeDays: string[] = [];
    const paidDays: string[] = [];

    let index = 0;
    pricingMask.forEach((bit) => {
      if (bit == "0") {
        freeDays.push(this.weekdays[index]);
      } else {
        paidDays.push(this.weekdays[index]);
      }
      index++;
    });

    pricings.push({
      day: freeDays.reduce((a, b) => a + ", " + b),
      rates: [],
      price: 0.0
    });

    pricings.push({
      day: paidDays.reduce((a, b) => a + ", " + b),
      rates: this.makePriceRangesFromMask(parking.pricing.hours),
      price: parking.pricing.price
    });

    return pricings;
  }

  private makePriceRangesFromMask(hoursMask: string): PriceRange[] {
    const ranges: PriceRange[] = [];

    const hoursBits = hoursMask.split('');

    let rangeStart = 0;
    let rangeEnd = 0;
    let lastBit = hoursBits[0];

    let index = 1;
    hoursBits.slice(1).forEach((bit) => {
      if (lastBit == "0") {
        if (bit == "0") {
          rangeEnd = index;
        } else {
          rangeEnd = index;
          ranges.push(this.makeRange(rangeStart, rangeEnd, false));
          rangeStart = index;
        }
      } else {
        if (bit == "1") {
          rangeEnd = index;
        } else {
          rangeEnd = index;
          ranges.push(this.makeRange(rangeStart, rangeEnd, true));
          rangeStart = index;
        }
      }

      lastBit = bit;
      index++;
    });

    if (lastBit == "0") {
      rangeEnd = index;
      ranges.push(this.makeRange(rangeStart, rangeEnd, false));
    } else {
      rangeEnd = index;
      ranges.push(this.makeRange(rangeStart, rangeEnd, true));
    }

    return ranges;
  }

  private makeRange(start: number, end: number, isPaid: boolean): PriceRange {
    return {
      range: this.indexToHour(start) + "-" + this.indexToHour(end),
      isPaid: isPaid
    }
  }

  private indexToHour(index: number): string {
    if (index < 10) {
      return "0" + index + ":00";
    } else {
      return index + ":00";
    }
  }

  setCurrentPill(pillName: string) {
    this.currentPill = pillName;
  }

}

export type Pricing = {
  day: string,
  rates: PriceRange[],
  price: number
}

export type PriceRange = {
  range: string,
  isPaid: boolean
}
