import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenManagerService } from './token-manager';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: TokenManagerService, public router: Router) { }
    
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['signin']);
            return false;
        }
        return true;
    }
}