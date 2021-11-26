import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullDefaultValueDirective } from './default-value.directive';


@NgModule({
    declarations: [
        NullDefaultValueDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NullDefaultValueDirective
    ]
})
export class DefaultValueModule {
}
