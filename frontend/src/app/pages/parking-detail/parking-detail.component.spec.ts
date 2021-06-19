import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Parking, ParkingSearchService } from 'src/app/services/parking-search.service';

import { ParkingDetailComponent } from './parking-detail.component';

describe('ParkingDetailComponent', () => {
  let component: ParkingDetailComponent;
  let fixture: ComponentFixture<ParkingDetailComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ParkingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: { params: of({ cityName: "cesena", id: 1 }) }
        },
        {
          provide: ParkingSearchService, useValue: fakeParkingSearchService as unknown as ParkingSearchService
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pricing mask parsing', () => {
    expect(component.pricings).toEqual([{ day: 'Sat, Sun', rates: [], price: 0 }, { day: 'Mon, Tue, Wed, Thu, Fri', rates: [Object({ range: '00:00-08:00', isPaid: false }), Object({ range: '08:00-20:00', isPaid: true }), Object({ range: '20:00-24:00', isPaid: false })], price: 1.2 }]);
  });

  it('current pill', () => {
    component.setCurrentPill('statistics');
    expect(component.currentPill).toEqual('statistics');
  });
});
