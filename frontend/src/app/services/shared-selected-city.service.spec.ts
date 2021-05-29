import { TestBed } from '@angular/core/testing';
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
});
