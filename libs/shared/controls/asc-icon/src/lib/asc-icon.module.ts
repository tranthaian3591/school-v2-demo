import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscIconComponent } from './asc-icon.component';
import { TranferIconPipeModule } from '@school-v2/shared/pipes/tranfer-icon';
import { SafeHtmlPipeModule } from '@school-v2/shared/pipes/safe-html';

@NgModule({
    imports: [
        CommonModule,
        TranferIconPipeModule,
        SafeHtmlPipeModule],
    declarations: [
        AscIconComponent
    ],
    exports: [
        AscIconComponent
    ]
})
export class AscIconModule {
}
