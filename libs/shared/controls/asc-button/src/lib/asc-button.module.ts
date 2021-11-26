import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscButtonComponent } from './asc-button.component';
import { SafeHtmlPipeModule } from '@school-v2/shared/pipes/safe-html';
import { TranferIconPipeModule } from '@school-v2/shared/pipes/tranfer-icon';

@NgModule({
    imports: [CommonModule, SafeHtmlPipeModule, TranferIconPipeModule],
    declarations: [
        AscButtonComponent
    ],
    exports: [
        AscButtonComponent
    ]
})
export class AscButtonModule {
}
