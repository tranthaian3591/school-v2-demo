import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstant } from '@school-v2/constant';

@Injectable({ providedIn: 'root' })
export class AppMessageConfig {
    static settings: any;

    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = `_config/message.json?v=${AppConstant.VERSION}`;
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile)
                .toPromise()
                .then((response: unknown) => {
                    AppMessageConfig.settings = response as unknown;
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
        return AppMessageConfig.settings;
    }
}
