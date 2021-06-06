import { TestBed } from '@angular/core/testing';

import { ParkingSearchService } from './parking-search.service';

describe('ParkingSearchService', () => {
  let service: ParkingSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
