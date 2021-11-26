import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UrlConstant } from '@school-v2/constant';
import { AuthService } from '@school-v2/auth/services';

@Injectable({providedIn: 'root'})
export class MasterGuard implements CanActivate {
    constructor(public router: Router, private auth: AuthService) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }
        return true;
    }
}
