import { APP_INITIALIZER, ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { extModules } from './build-specifics';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppConstant } from '@school-v2/constant';
import { StoreModule } from '@ngrx/store';
import en from '@angular/common/locales/en';
import { en_US, NZ_DATE_LOCALE, NZ_I18N, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';

import { MessageService } from '@progress/kendo-angular-l10n';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GlobalErrorHandler, MessageKendoService } from './global-handler';
import { AppConfigEnv, AppMessageConfig } from './configs';
import { ToastrModule } from 'ngx-toastr';
import { enUS, vi } from 'date-fns/locale';

registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        './i18n/',
        '.json?v=' + AppConstant.VERSION
    );
}

export function initializeApp(config: AppConfigEnv) {
    return () => config.load();
}

export function initializeMessageApp(appMessageConfig: AppMessageConfig) {
    return () => appMessageConfig.load();
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzIconModule,
        NzModalModule,
        NzNotificationModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({
            defaultLanguage: 'vi',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        ToastrModule.forRoot(),
        StoreModule.forRoot({}, {}),
        ...extModules,
    ],
    exports: [
        NgxSpinnerModule
    ],
    providers: [
        TranslateService,
        AppConfigEnv,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfigEnv],
            multi: true,
        },
        {
            provide: NZ_I18N, useValue: en_US
        },
        {
            provide: NZ_DATE_LOCALE, useValue: enUS
        },
        {
            provide: MessageService, useClass: MessageKendoService
        },
        {
            provide: ErrorHandler, useClass: GlobalErrorHandler
        }
    ]
})
export class WebConfigModule {
    constructor(@Optional() @SkipSelf() parentModule: WebConfigModule, private i18n: NzI18nService) {
        this.i18n.setLocale(vi_VN);
        this.i18n.setDateLocale(vi);
        if (parentModule) {
            throw new Error(
                'Web Config is already loaded. Import it in the AppModule only'
            );
        }
    }
}
