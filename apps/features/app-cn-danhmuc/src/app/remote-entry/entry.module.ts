import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@school-v2/features/danh-muc/feature').then(
            (m) => m.DanhMucFeatureModule
          ),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
