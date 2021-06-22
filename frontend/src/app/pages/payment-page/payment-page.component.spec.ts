import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DateService } from 'src/app/services/date.service';
import { Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

import { PaymentPageComponent } from './payment-page.component';

describe('PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;

  const fakeParking: Parking = {
    id: 1,
    longitude: 12.236731,
    latitude: 44.147660,
    parkingSpots: [{
      occupied: true,
      paidFor: true,
      latitude: 44.147612,
      longitude: 12.236550,
    },
    {
      occupied: false,
      paidFor: true,
      latitude: 44.147564,
      longitude: 12.236589,
    }, {
      occupied: false,
      paidFor: false,
      latitude: 44.147508,
      longitude: 12.236632,
    }, {
      occupied: true,
      paidFor: false,
      latitude: 44.147432,
      longitude: 12.236699,
    }
    ],
    detail: {
      name: "Cesena",
      address: "Via Riccardo Bacchelli, 47522 Cesena FC",
      type: "Open Park",
      imageUrl: "http://www.parkingroma.it/wp-content/uploads/2016/02/strisce-blu.jpg"
    },
    pricing: {
      days: "1111100",
      hours: "000000001111111111110000",
      price: 1.20
    }
  };

  const fakeParkingSearchService = { getParkingByCityNameAndParkingId: (s: string, id: number) => of(fakeParking) };
  const fakeDateService = {
    now: () => {
      const date = new Date();
      date.setHours(8)
      date.setMinutes(0)
      return date;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PaymentPageComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: { params: of({ cityName: "cesena", id: 1 }) }
        },
        {
          provide: ParkingSearchService, useValue: fakeParkingSearchService as unknown as ParkingSearchService
        },
        {
          provide: DateService, useValue: fakeDateService as unknown as DateService
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add hours', () => {
    expect(component.hours).toEqual(0);
    component.addHours(1);
    expect(component.hours).toEqual(1);
  });

  it('add hours bounds', () => {
    expect(component.hours).toEqual(0);
    component.addHours(10);
    expect(component.endDateHours).toEqual("18");
    component.addHours(1);
    expect(component.endDateHours).toEqual("18");
  });

  it('add minutes', () => {
    expect(component.minutes).toEqual(0);
    component.addMinutes(15);
    expect(component.minutes).toEqual(15);
  });

  it('add minutes bounds', () => {
    expect(component.minutes).toEqual(0);
    component.addMinutes(45);
    expect(component.minutes).toEqual(45);
    component.addMinutes(45);
    expect(component.minutes).toEqual(45);
  });

});
