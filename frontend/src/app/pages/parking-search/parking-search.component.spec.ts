import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { City } from 'src/app/services/parking-search.service';
import { SharedSelectedCityService } from 'src/app/services/shared-selected-city.service';

import { ParkingSearchComponent } from './parking-search.component';

const fakeCity: City = {
  name: "cesena",
  longitude: 12.2429281,
  latitude: 44.1390945,
  parkings: [{
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
  },
  {
    id: 2,
    longitude: 12.238529,
    latitude: 44.144281,
    parkingSpots: [

    ],
    detail: {
      name: "placeholder",
      address: "placeholder",
      type: "placeholder",
      imageUrl: ""
    },
    pricing: {
      days: "1111100",
      hours: "000000001111111111110000",
      price: 1.20
    }
  },
  {
    id: 4,
    longitude: 12.247764,
    latitude: 44.143680,
    parkingSpots: [

    ],
    detail: {
      name: "placeholder",
      address: "placeholder",
      type: "placeholder",
      imageUrl: ""
    },
    pricing: {
      days: "1111100",
      hours: "000000001111111111110000",
      price: 1.20
    }
  }
  ]
}

const fakeSharedService = new SharedSelectedCityService();

describe('ParkingSearchComponent', () => {
  let component: ParkingSearchComponent;
  let fixture: ComponentFixture<ParkingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ParkingSearchComponent],
      providers: [{
        provide: SharedSelectedCityService,
        useValue: fakeSharedService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cityCenterMode', () => {
    component.cityCenterMode();

    expect(component.currentLocationUnavailable).toBeFalse();
    expect(component.currentLocationSearchEnabled).toBeFalse();
  });

  it('currentLocationMode', () => {
    component.currentLocationMode();

    expect(component.currentLocationUnavailable).toBeFalse();
    expect(component.currentLocationSearchEnabled).toBeTrue();
  });

  it('citySelect', () => {
    fakeSharedService.emitParkingSearchSelectedCity(fakeCity);

    expect(component.selectedCity).toEqual(fakeCity);
  });
});
