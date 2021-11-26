import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@school-v2/features/danh-sach-truy-cap/feature').then(
            (m) => m.DanhSachTruyCapFeatureModule
          ),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
