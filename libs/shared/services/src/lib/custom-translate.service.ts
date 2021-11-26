import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangEnum, AppConstant } from '@school-v2/constant';
import { SafeAny } from '@school-v2/shared/utils';

@Injectable({
    providedIn: 'root',
})
export class CustomTranslateService {
    translateResources: SafeAny;

    langs = [
        {
            symbol: LangEnum.VI,
            name: 'Tiếng Việt',
            path: './assets/images/Flag_vietnam.png',
        },
        {
            symbol: LangEnum.EN,
            name: 'Tiếng Anh',
            path: './assets/images/Flag_kingdom.png',
        },
    ];

    constructor(private translate: TranslateService) {
        this.translate.use(this.getCurrentLang());
        this.load();
    }

    load() {
        this.translate.getTranslation(this.getCurrentLang()).subscribe(res => {
            this.translateResources = res;
            this.translate.use(this.getCurrentLang());
        });
    }

    get(key: string): string {
        return this.translateResources[key];
    }

    setCurrentLang(lang: string) {
        if (lang) {
            this.translate.setDefaultLang(lang);
            // set localstorage
            localStorage.setItem(AppConstant.CURRENT_LANG, lang);
            this.translate.use(lang);
            this.load();
        } else {
            this.translate.setDefaultLang(LangEnum.VI);
            this.translate.use(LangEnum.VI);
        }
    }

    getCurrentLang() {
        const currentLang = localStorage.getItem(AppConstant.CURRENT_LANG);
        if (currentLang !== null && currentLang !== undefined) {
            return currentLang;
        }
        return LangEnum.VI;
    }

    languageName() {
        const currentLang = this.getCurrentLang();
        return this.langs ? this.langs.find(m => m.symbol === currentLang)?.name : '';
    }

    languageImage() {
        const currentLang = this.getCurrentLang();
        return this.langs? this.langs.find(m => m.symbol === currentLang)?.path : '';
    }
}
