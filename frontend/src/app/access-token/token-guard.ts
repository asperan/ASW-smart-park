import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenManagerService } from './token-manager';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: TokenManagerService, public router: Router) { }
    
    canActivate(): Observable<boolean> {
        return this.auth.isAuthenticated().pipe(map(isValid => {
            if (!isValid) {
                this.router.navigate(['signin']);
                return false;
            }
            return true;
        }));
    }
}