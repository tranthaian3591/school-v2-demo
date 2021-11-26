import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnphabetPipe } from './tranfer-anphabet.pipe';

@NgModule({
    declarations: [AnphabetPipe],
    imports: [CommonModule],
    exports: [AnphabetPipe]
})
export class TranferAnphabetPipeModule { }
