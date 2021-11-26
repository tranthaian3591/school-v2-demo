import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhSachTruyCapComponent } from './danh-sach-truy-cap/danh-sach-truy-cap.component';

import { DanhSachTruyCapUiModule } from '@school-v2/features/danh-sach-truy-cap/ui';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachTruyCapService } from '@school-v2/features/danh-sach-truy-cap/services';
import { NgZorroAntdModule, SharedBaseModule } from '@school-v2/shared/base';

const routes: Routes = [
  {
    path: '',
    component: DanhSachTruyCapComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DanhSachTruyCapUiModule,
    SharedBaseModule
    //NgZorroAntdModule,
  ],
  declarations: [DanhSachTruyCapComponent],
  providers: [DanhSachTruyCapService],
})
export class DanhSachTruyCapFeatureModule {}
