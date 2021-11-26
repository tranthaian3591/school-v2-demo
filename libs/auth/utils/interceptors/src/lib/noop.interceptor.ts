import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SafeAny } from '@school-v2/shared/utils';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<SafeAny>,
        next: HttpHandler
    ): Observable<HttpEvent<SafeAny>> {
        console.log(req.url);
        return next.handle(req);
    }
}
