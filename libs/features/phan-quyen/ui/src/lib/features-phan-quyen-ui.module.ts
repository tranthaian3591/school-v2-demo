import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NgZorroAntdModule } from '@school-v2/shared/base';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { NzSelectModule } from 'ng-zorro-antd/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
import { AscFormControlModule } from '@school-v2/shared/controls/asc-form-control';
import { ThemQuyenComponent } from './add-permissions-to-role/add-permissions-to-role.component';
import { TranslateModule } from '@ngx-translate/core';
import { GridModule } from '@progress/kendo-angular-grid'; 
import { LayoutModule } from "@progress/kendo-angular-layout";

@NgModule({
  imports: [CommonModule,
            NgZorroAntdModule,
            DialogsModule,
            WindowModule,
            NzSelectModule,
            FormsModule,
            ReactiveFormsModule ,
            NzNotificationModule,
            AscButtonModule,
            AscFormControlModule,
            TranslateModule,
            GridModule,
            LayoutModule
          ],
  declarations: [ThemQuyenComponent],
  exports: [ThemQuyenComponent],
})
export class FeaturesPhanQuyenUiModule {}
