import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventHrefDirective } from './prevent-href.directive';


@NgModule({
    declarations: [
        PreventHrefDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PreventHrefDirective
    ]
})
export class PreventHrefModule {
}
