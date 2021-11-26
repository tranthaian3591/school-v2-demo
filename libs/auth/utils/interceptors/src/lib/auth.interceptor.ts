import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take, } from 'rxjs/operators';
import { AuthService, JwtUtil } from '@school-v2/auth/services';
// import { RefreshStateService } from '@school-v2/shared/socket';
import { SafeAny } from '@school-v2/shared/utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authHeader = 'Authorization';
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<SafeAny> = new BehaviorSubject<SafeAny>(
        null
    );

    constructor(
        private auth: AuthService,
        // private refreshStateService: RefreshStateService
    ) {
    }

    intercept(
        req: HttpRequest<SafeAny>,
        next: HttpHandler
    ): Observable<HttpEvent<SafeAny>> {
        const configUrl = req.url.split('/');
        req = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                'X-Content-Type-Options': 'nosniff',
                'X-XSS-Protection': '1'
            },
        });
        if (
            configUrl.includes('_config') ||
            configUrl.includes('i18n') ||
            configUrl.includes('Login')
        ) {
            return next.handle(req);
        }
        req = this.addAuthenticationToken(req);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            filter((result) => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                        this.refreshTokenSubject.next(null);

                        return this.refreshAccessToken().pipe(
                            switchMap((success: boolean) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                            // for the next time the token needs to be refreshed
                            finalize(() => {
                                this.refreshTokenInProgress = false;
                            })
                        );
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    /**
     * Refreshs access token
     * @returns access token
     */
    private refreshAccessToken(): Observable<SafeAny> {
        return this.auth.doRefreshToken().pipe(
            map((isSuccess) => {
                // set user token
                if (isSuccess) {
                    // comment code demo
                    // this.refreshStateService.refreshConnectionSignalR();
                } else {
                    this.auth.doBackLogin();
                }
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<SafeAny>): HttpRequest<SafeAny> {
        // Get an access token
        const token = JwtUtil.getAccessToken();
        if (!token) {
            return request;
        }
        return request.clone({
            headers: request.headers
                .set(this.authHeader, 'Bearer ' + token)
                .set('Access-Control-Max-Age', '86400'),
        });
    }
}
