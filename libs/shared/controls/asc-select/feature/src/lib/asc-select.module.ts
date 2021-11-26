import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'; 
import { AscSelectComponent } from './asc-select.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NgxSpinnerModule],
    declarations: [AscSelectComponent],
    exports: [AscSelectComponent],
    providers: [NgxSpinnerService]
})
export class AscSelectModule {
}
