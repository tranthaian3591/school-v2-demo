import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscPreviewAttachmentComponent } from './asc-preview-attachment.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { NgxPrinterModule } from 'ngx-printer';

@NgModule({
    imports: [
        CommonModule,
        NzSkeletonModule,
        AscButtonModule,
        NgxSpinnerModule,
        LoadingBarModule
    ],
    declarations: [
        AscPreviewAttachmentComponent
    ],
    exports: [
        AscPreviewAttachmentComponent
    ]
})
export class AscPreviewAttachmentModule {
}