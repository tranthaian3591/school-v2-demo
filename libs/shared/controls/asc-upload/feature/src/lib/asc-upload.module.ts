import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscUploadComponent } from './asc-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
    declarations: [
        AscUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzModalModule,
        NzUploadModule,
        NzIconModule
    ],
    exports: [
        AscUploadComponent
    ]
})
export class AscUploadModule {
}
