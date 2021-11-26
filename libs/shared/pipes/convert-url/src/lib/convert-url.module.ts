import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertUrlPipe } from './convert-url.pipe';

@NgModule({
    declarations: [ConvertUrlPipe],
    imports: [CommonModule],
    exports: [ConvertUrlPipe]
})
export class ConvertUrlPipeModule { }
