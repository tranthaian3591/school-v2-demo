import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@school-v2/features/login/feature').then(
            (m) => m.LoginFeatureModule
          ),
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class RemoteEntryModule {}
