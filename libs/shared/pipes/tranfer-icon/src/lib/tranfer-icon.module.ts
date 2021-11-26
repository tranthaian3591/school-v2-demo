import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranferIconPipe } from './tranfer-icon.pipe';

@NgModule({
    declarations: [
        TranferIconPipe
    ],
    imports: [CommonModule],
    exports: [
        TranferIconPipe
    ]
})
export class TranferIconPipeModule {}
