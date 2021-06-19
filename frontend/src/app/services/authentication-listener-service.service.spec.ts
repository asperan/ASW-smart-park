import { TestBed } from '@angular/core/testing';

import { AuthenticationListenerService } from './authentication-listener-service.service';

describe('AuthenticationListenerServiceService', () => {
  let service: AuthenticationListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("emitIsAuthenticated", () => {
    service.sharedIsAuthenticated.subscribe(res => {
      expect(res).toEqual(true);
    })

    service.emitIsAuthenticated(true);
  });
});
