import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { City, ParkingSearchService } from './parking-search.service';

const baseUrl = "http://localhost:3000/api";
const citiesUrl = baseUrl + "/city";
const parkingsUrl = baseUrl + "/parking";

describe('ParkingSearchService', () => {
  let httpTestingController: HttpTestingController;
  let service: ParkingSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ParkingSearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllCities', () => {
    service.getAllCities().subscribe(res => {
      expect(res).toEqual(expectedCities);
    });

    const testRequest = httpTestingController.expectOne(citiesUrl + "/all/");
 
    testRequest.flush(expectedCities);
  });

  it('#suggestCity', () => {
    service.suggestCity("c").subscribe(res => {
      expect(res).toEqual([expectedCities[0]]);
    });

    const testRequest = httpTestingController.expectOne(citiesUrl + "/suggest/" + "c");
 
    testRequest.flush([expectedCities[0]]);
  });

  it('#getParkingsInRadiusCityCenter', () => {
    service.getParkingsInRadiusCityCenter("cesena", 1).subscribe(res => {
      expect(res).toEqual(expectedCities[0].parkings);
    });

    const testRequest = httpTestingController.expectOne(parkingsUrl + "/radius-center/");
 
    testRequest.flush(expectedCities[0].parkings);
  });

  it('#getParkingsInRadiusPoint', () => {
    service.getParkingsInRadiusPoint("cesena", 10, 10, 1).subscribe(res => {
      expect(res).toEqual(expectedCities[0].parkings);
    });

    const testRequest = httpTestingController.expectOne(parkingsUrl + "/radius/");
 
    testRequest.flush(expectedCities[0].parkings);
  });

  it('#getParkingByCityNameAndParkingId', () => {
    service.getParkingByCityNameAndParkingId("cesena", 1).subscribe(res => {
      expect(res).toEqual(expectedCities[0].parkings[0]);
    });

    const testRequest = httpTestingController.expectOne(parkingsUrl + "/spots/" + "cesena" + "/" + "1");
 
    testRequest.flush(expectedCities[0].parkings[0]);
  });

});

const expectedCities: City[] = [{
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
  },
  {
      name: "rimini",
      longitude: 12.568333,
      latitude: 44.059444,
      parkings: []
  }
];
