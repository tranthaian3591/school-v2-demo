import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConstant } from '@school-v2/constant';
import { IAppConfig } from './app-config.model';
import { APP_CONFIG } from '../environment';
import { IEnvironmentConfig } from '../environment';

@Injectable()
export class AppConfigEnv {
    static settings: IAppConfig;

    constructor(
        @Inject(APP_CONFIG) private env: IEnvironmentConfig,
        private http: HttpClient
    ) {
    }

    load() {
        const jsonFile = `_config/config.${this.env.name}.json?v=${AppConstant.VERSION}`;
        let header = new HttpHeaders();
        header = header.set('cache-response', 'true');
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile, {
                    headers: header,
                })
                .toPromise()
                .then((response: IAppConfig) => {
                    AppConfigEnv.settings = response as IAppConfig;
                    resolve();
                })
                .catch((response: HttpErrorResponse) => {
                    reject(
                        `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
                    );
                });
        });
    }

    getConfig() {
        return AppConfigEnv.settings;
    }
}
