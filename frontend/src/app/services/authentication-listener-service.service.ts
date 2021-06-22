import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationListenerService {

  private isAuthenticated = new Subject<boolean>();
  sharedIsAuthenticated = this.isAuthenticated.asObservable();

  constructor() { }

  emitIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated.next(isAuthenticated);
  }

}
