import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverflowBodyDirective } from './overflow-body.directive';
import { OverlayWindowDirective } from './overlay-window.directive';

@NgModule({
    declarations: [OverflowBodyDirective, OverlayWindowDirective],
    imports     : [CommonModule],
    exports     : [OverflowBodyDirective, OverlayWindowDirective]
})
export class OverflowBodyModule {
}
