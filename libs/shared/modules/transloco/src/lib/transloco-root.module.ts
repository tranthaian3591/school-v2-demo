import { HttpClient } from '@angular/common/http';
import {
    TRANSLOCO_LOADER,
    Translation,
    TranslocoLoader,
    TRANSLOCO_CONFIG,
    translocoConfig,
    TranslocoModule, TranslocoService
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
// import { environment } from '@asc-nx/shared/environments';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string) {
        return this.http.get<Translation>(`/i18n/${lang}.json`);
    }
}

@NgModule({
    exports: [ TranslocoModule ],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                fallbackLang: 'en',
                missingHandler: {
                    // It will use the first language set in the `fallbackLang` property
                    useFallbackTranslation: true,
                    logMissingKey: false
                },
                availableLangs: ['vi', 'en'],
                defaultLang: 'vi',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                // prodMode: environment.production,
            })
        },
        {
            provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader
        },
        TranslocoService
    ],
})
export class TranslocoRootModule {}