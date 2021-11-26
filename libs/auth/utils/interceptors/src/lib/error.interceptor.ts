import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessageConstant, UrlConstant } from '@school-v2/constant';
import { Router } from '@angular/router';
import { NotificationService } from '@school-v2/shared/services';
import { IResponseData } from '@school-v2/shared/models';
import { AuthService } from '@school-v2/auth/services';
import { AppMessageConfig } from '@school-v2/web-config';
import { SafeAny } from '@school-v2/shared/utils';

// import { AppMessageConfig } from '@school-v2/web-config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRunBackground = 'background';
    constructor(
        private auth: AuthService,
        private notification: NotificationService,
        private router: Router,
        private modalService: NzModalService
    ) {
    }

    intercept(
        req: HttpRequest<SafeAny>,
        next: HttpHandler
    ): Observable<HttpEvent<SafeAny>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ProgressEvent) {
                    if (this.isRunBackgroundFn(req)) {
                        this.notification.showErrorMessage(MessageConstant.COMMON.MSG_SERVER_DISCONNECT);
                    }
                } else if (error.error instanceof ErrorEvent) {
                    this.notification.showErrorMessage(
                        MessageConstant.COMMON.MSG_INTERNET_REFUSE
                    );
                } else {
                    const statusCode = error.status;
                    const params = req.url.split('/');
                    switch (statusCode) {
                        case 401:
                            // 401 handled in auth.interceptor
                            if ((params.includes('Accounts') && params.includes('Refresh-Token')) ||
                                (params.includes('Accounts') && params.includes('Logout'))
                            ) {
                                this.auth.doBackLogin();
                            }
                            break;
                        case 403:
                            this.modalService.closeAll();
                            // 403 handled in auth.interceptor
                            this.modalService.warning({
                                nzTitle: 'Thông báo',
                                nzContent: 'Bạn không có quyền truy cập vào chức năng này !',
                                nzOkText: 'Đồng ý',
                            });
                            this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
                            break;
                        case 404:
                            this.notification.showErrorMessage(error.statusText);
                            break;
                        case 500:
                            if (
                                (params.includes('Accounts') && params.includes('Refresh-Token')) ||
                                (params.includes('Accounts') && params.includes('Logout'))
                            ) {
                                this.auth.doBackLogin();
                            } else {
                                if (this.isRunBackgroundFn(req)) {
                                    this.notification.showErrorMessage(
                                        MessageConstant.COMMON.MSG_ERROR_SYSTEM
                                    );
                                }
                            }

                            break;
                        case 503:
                            if (this.isRunBackgroundFn(req)) {
                                this.notification.showErrorMessage(MessageConstant.COMMON.MSG_ERROR_SYSTEM);
                            }
                            break;
                        default:
                            if (
                                statusCode !== 200 &&
                                params.includes('Accounts') &&
                                params.includes('Refresh-Token')
                            ) {
                                this.auth.doBackLogin();
                            } else {
                                if (error.error) {
                                    const serverError = error.error as IResponseData<SafeAny>;
                                    if (error.error && error.error.traceId) {
                                        if (this.isRunBackgroundFn(req)) {
                                            this.notification.showErrorMessage(
                                                MessageConstant.COMMON.MSG_FORMAT_INVALID
                                            );
                                        }
                                    } else {
                                        if (serverError && serverError.errorMessages) {
                                            const messages = serverError.errorMessages
                                                .map((x) => {
                                                    // return this.getMessage(x.errorCode);
                                                    return this.getMessageToJson(x.errorCode, x.errorMessage);
                                                })
                                                .join('<br/>');
                                            this.notification.showErrorMessage(messages);
                                        }
                                    }
                                } else {
                                    this.notification.showErrorMessage(error.error.error.message);
                                }
                            }
                            break;
                    }
                }
                return throwError(error);
            })
        );
    }

    getMessageToJson(key: string, mes: any): string {
        try {
            const message = AppMessageConfig.settings[key];
            if (!message) {
                return mes;
            }
            return message;
        } catch (e) {
            return mes;
        }
    }

    private isRunBackgroundFn(req: any) {
        return !req.headers.get(this.isRunBackground) || req.headers.get(this.isRunBackground) !== 'true'
    }
}
