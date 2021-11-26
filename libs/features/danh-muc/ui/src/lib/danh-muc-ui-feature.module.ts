import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDanhMucComponent } from './form-danh-muc/form-danh-muc.component';
import { NgZorroAntdModule } from '@school-v2/shared/base';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormChucVuComponent } from './form-tinh-thanh/form-tinh-thanh.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
import { AscFormControlModule } from '@school-v2/shared/controls/asc-form-control';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DialogsModule,
    WindowModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule ,
    NzNotificationModule,
    AscButtonModule,
    AscFormControlModule
  ],
  declarations: [FormDanhMucComponent,FormChucVuComponent],
  exports: [FormDanhMucComponent,FormChucVuComponent],
})
export class DanhMucUiModule {}
