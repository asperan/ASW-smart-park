import { TestBed } from '@angular/core/testing';
import { City } from './parking-search.service';
import { SharedSelectedCityService } from './shared-selected-city.service';


describe('SharedserviceService', () => {
  let service: SharedSelectedCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSelectedCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("emitParkingSearchSelectedCity", () => {
    service.sharedParkingSearchSelectedCity.subscribe(res => {
      expect(res).toEqual(expectedCity);
    })

    service.emitParkingSearchSelectedCity(expectedCity);
  });

});

const expectedCity: City = {
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
  };

