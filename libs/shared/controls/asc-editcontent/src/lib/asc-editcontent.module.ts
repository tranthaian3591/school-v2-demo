import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscEditcontentComponent } from './asc-editcontent.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AscEditcontentComponent
    ],
    exports: [AscEditcontentComponent]
})
export class SharedControlsAscEditcontentModule {
}
