import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UrlConstant } from '@school-v2/constant';
import { AuthService } from '@school-v2/auth/services';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ApiService } from '@school-v2/shared/services';
import { MenuService } from '@school-v2/shared/state/menu';

@Injectable({providedIn: 'root'})
export class RedirectUrlGuard implements CanActivate {
    private exceptUrls = ['/', '/login'];
    constructor(
        private router: Router,
        private auth: AuthService,
        private apiService: ApiService,
        private menuService: MenuService
    ) {
    }

    /**
     *
     * @param next
     * @param state
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // check with access token
        if (this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.DASHBOARD]);
            return true;
        }
        this.router.navigate([UrlConstant.ROUTE.LOGIN]);
        return false;
    }

}
