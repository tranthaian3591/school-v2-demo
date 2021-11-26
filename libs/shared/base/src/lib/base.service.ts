import { Inject, Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { SafeAny } from "@school-v2/shared/utils";
import { AppConstant } from "@school-v2/constant";
import { tap } from "rxjs/operators";
import { APP_CONFIG, IAppConfig, IEnvironmentConfig } from "@school-v2/web-config";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    configSubject = new BehaviorSubject<SafeAny>(null);
    protected apiUrl: string | undefined;
    protected apiVersionUrl: string | undefined;
    protected hubUrl: string | undefined;
    protected thongBaoUrl: string | undefined;
    protected http: HttpClient;
    constructor(
        injector: Injector,
        @Inject(APP_CONFIG) private env: IEnvironmentConfig
    ) {
        this.http = injector.get(HttpClient);
    }

    loadConfig(): Observable<SafeAny> {
        let header = new HttpHeaders();
        header = header.set('cache-response', 'true');
        const jsonFile = `_config/config.${this.env.name}.json?v=${AppConstant.VERSION}`;
        return this.http.get(jsonFile, {
            headers: header,
        }).pipe(
            tap((config: IAppConfig) => {
                this.configSubject.next(config);
                this.thongBaoUrl = `${config.apiServer}/notification-gateway/api/v1`
                // this.apiUrl = `${config.apiServer}/api/${config.version}/`;
                this.apiUrl = `${config.apiServer}/api/`;
                this.apiVersionUrl = `${config.apiServer}/api/v`;
                this.hubUrl = config.notificationUrl;
            })
        );
    }
}
