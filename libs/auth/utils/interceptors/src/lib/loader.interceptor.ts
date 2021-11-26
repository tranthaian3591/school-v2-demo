import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '@school-v2/shared/services';
import { SafeAny } from '@school-v2/shared/utils';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService) {
    }

    intercept(
        req: HttpRequest<SafeAny>,
        next: HttpHandler
    ): Observable<HttpEvent<SafeAny>> {
        if (req.headers.get('read') === 'true' || (req.body && req.body?.isPreview === true)) {
            return next.handle(req);
        }
        this.loading.setLoading(true, req.url);
        return next
            .handle(req)
            .pipe(finalize(() => this.loading.setLoading(false, req.url)));
    }
}
