import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from '@school-v2/shared/base';
import { FeaturesThongTinNguoiDungModule } from '@school-v2/features/thong-tin-nguoi-dung';
import { EntryComponent } from './entry.component';
import { CommonModule } from '@angular/common';
import { ENTRY_ROUTES } from './entry.routes';

@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FeaturesThongTinNguoiDungModule,
    RouterModule.forChild(ENTRY_ROUTES),
  ],
  providers: [],
  exports: [],
})
export class RemoteEntryModule {}
