import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PhanQuyenComponent } from './phan-quyen/phan-quyen.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button'; 
import { AscSelectModule } from '@school-v2/shared/controls/asc-select/feature';
const routes: Routes = [
  {
    path: '',
    component: PhanQuyenComponent,
  },
];

@NgModule({
  imports: [
    CommonModule, 
    GridModule,
    DialogsModule,
    TooltipModule,
    LayoutModule,
    TreeViewModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AscButtonModule, 
    AscSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhanQuyenComponent],
})
export class PhanQuyenFeatureModule {}
