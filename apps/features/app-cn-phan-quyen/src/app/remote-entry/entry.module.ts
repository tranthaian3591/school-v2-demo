import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@school-v2/features/phan-quyen/feature').then(
            (m) => m.PhanQuyenFeatureModule
          ),
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class RemoteEntryModule {}
