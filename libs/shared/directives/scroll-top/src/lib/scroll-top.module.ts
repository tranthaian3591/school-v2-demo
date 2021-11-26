import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogScrolltopDirective } from './scroll-top.directive';

@NgModule({
    declarations: [DialogScrolltopDirective],
    imports: [CommonModule],
    exports: [DialogScrolltopDirective]
})
export class ScrollTopModule {
}
