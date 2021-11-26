import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UrlConstant } from '@school-v2/constant';
import { AuthService } from '@school-v2/auth/services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(public router: Router, private auth: AuthService) {
    }

    /**
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }

        // if (!this.menuQuery.checkLinkUserHasAccess(state.url)) {
        //     this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
        // }

        return true;
    }

    /**
     *
     * @param childRoute
     * @param state
     */

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }

        // if (!this.menuQuery.checkLinkUserHasAccess(state.url)) {
        //     this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
        // }

        return true;
    }

}
