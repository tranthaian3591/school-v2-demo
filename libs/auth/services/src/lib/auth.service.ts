import { Inject, Injectable, Injector } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConstant, SubFolder, UrlConstant } from '@school-v2/constant';
import { Observable } from 'rxjs';
import { navigateToExternalLink, SecurityUtil } from '@school-v2/shared/utils';
import { AuthStore, ITokenInfo } from '@school-v2/auth/data-access';
import { AppConfigEnv, APP_CONFIG, IEnvironmentConfig } from '@school-v2/web-config';
import { environment } from '@school-v2/shared/environments';
import { JwtUtil } from './jwt';
import { SafeAny } from '@school-v2/shared/utils';
import { IResponseBaseModel } from '@school-v2/shared/data-access';
import { BaseService } from '@school-v2/shared/base';

@Injectable({providedIn: 'root'})
export class AuthService extends BaseService {
    private sessionCode = 'sessionCode';

    constructor(
        injector: Injector,
        private router: Router,
        private authStore: AuthStore,
        @Inject(APP_CONFIG) env: IEnvironmentConfig
    ) {
        super(injector, env);
    }

    /**
     * Do login
     * @param requestLogin
     * @returns
     */
    doLogin(requestLogin: SafeAny): Observable<boolean> {
        return this.setRequestLogin( this.apiUrl + UrlConstant.API.AUTH, requestLogin);
    }

    /**
     * Do login SSO
     * @param requestLogin
     * @returns
     */
    // doLoginSSO(requestLogin: SafeAny): Observable<boolean> {
    //     const url = `${this.apiVersionUrl + '2/' + UrlConstant.API.ACL_ACCOUNT}/ExternalLogin`;
    //     const request = {
    //         ...requestLogin,
    //         sessionCode: this.getCurrentSessionCode(),
    //     };

    //     return this.setRequestLogin(url, request);
    // }

    /**
     * Do refresh token
     * @returns refresh token
     */
    doRefreshToken(): Observable<boolean> {
        // const url = `${this.apiVersionUrl + '2/' + UrlConstant.API.ACL_ACCOUNT}/Refresh-Token`;
        // comment code (demo)
        const url = '';
        const request = {
            refreshToken: JwtUtil.getRefreshToken()
        };
        return this.setRequestLogin(url, request);
    }

    /**
     * Do logout
     * @returns
     */
    doLogout(model: SafeAny) {
      this.doBackLogin();

        // return this.http
        //            .post(`${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Logout`, model).pipe(
        //     finalize(() => this.doBackLogin())
        // );
    }

    doBackLogin() {
        this.clearAll();
        // redirect login page
        if (environment.production && AppConfigEnv.settings.sso) {
            location.href = AppConfigEnv.settings.sso + AppConstant.SSO_LOGOUT(location.origin);
        } else {
            this.redirectToLogin();
        }
    }


    /**
     * Determines whether authorized is
     */
    isAuthorized(): boolean {
        return !!JwtUtil.getAccessToken();
    }


    setCurrentSessionCode(value: string): void {
        localStorage.setItem(this.sessionCode, value);
    }

    getCurrentSessionCode(): string {
        const currentSessionCode = localStorage.getItem(this.sessionCode);
        if (currentSessionCode) {
            return currentSessionCode;
        }

        const newSessionCode = SecurityUtil.generateGuid();
        this.setCurrentSessionCode(newSessionCode);
        return newSessionCode;
    }

    clearAll() {
        const sessionKey = this.getCurrentSessionCode();
        localStorage.clear();
        localStorage.setItem(this.sessionCode, sessionKey);
    }

    redirectToLogin() {
        const currentUrl = location.pathname;
        const folders = Object.values(SubFolder).map(f => f);
        if (folders.filter(f => currentUrl.split('/').includes(f)).length > 0) {
            navigateToExternalLink(UrlConstant.ROUTE.LOGIN);
        }
        this.router.navigate([UrlConstant.ROUTE.LOGIN]);
    }

    private setRequestLogin(url: string, request: SafeAny) {
        return this.http.post(url, request).pipe(
            map((res: IResponseBaseModel<SafeAny>) => res.Result.Data),
            map((tokenInfo: ITokenInfo) => {
                // set user token
                if (tokenInfo) {
                    JwtUtil.setUserToken(tokenInfo);
                    const user = JwtUtil.getUserInfo();
                    if (user) {
                        // update current user
                        this.authStore.setCurrentUser(user);
                    }
                    return true;
                }
                return false;
            })
        );
    }
}
