import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscFormControlComponent } from './asc-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
// import { DefaultValueModule } from '@school-v2/shared/directives/default-value';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
    declarations: [
        AscFormControlComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputNumberModule,
        NzPopoverModule,
        NzDatePickerModule,
        // DefaultValueModule,
        CKEditorModule
    ],
    exports     : [
        AscFormControlComponent
    ]
})
export class AscFormControlModule {
}
