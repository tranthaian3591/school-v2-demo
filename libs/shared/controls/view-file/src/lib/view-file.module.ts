import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFileComponent } from './view-file.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SafeHtmlPipeModule } from '@school-v2/shared/pipes/safe-html'

@NgModule({
    declarations: [
        ViewFileComponent
    ],
    imports: [
        CommonModule,
        AscButtonModule,
        NzResultModule,
        NgxSpinnerModule,
        SafeHtmlPipeModule
    ],
    exports: [
        ViewFileComponent
    ]
})
export class ViewFileModule {
}
