import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { DanhMucUiModule } from '@school-v2/features/danh-muc/ui';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucService } from '@school-v2/features/danh-muc/services';
import {  NgZorroAntdModule, SharedBaseModule } from '@school-v2/shared/base';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranferIconPipeModule } from '@school-v2/shared/pipes/tranfer-icon';
import { SafeHtmlPipeModule } from '@school-v2/shared/pipes/safe-html';

import { NzTableModule } from 'ng-zorro-antd/table';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const routes: Routes = [
  {
    path: '',
    component: DanhMucComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DanhMucUiModule,
    TranslateModule,
    SharedBaseModule,
    TranferIconPipeModule,
    SafeHtmlPipeModule,
    NgZorroAntdModule,
    NzTableModule,
    GridModule,
    DialogsModule,
    NzButtonModule,
    NzIconModule,
    WindowModule,
    AscButtonModule,
    NzNotificationModule
  ],
  declarations: [DanhMucComponent],
    providers: [DanhMucService],
})
export class DanhMucFeatureModule {}
