import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { getRemoteModule, RemoteEntryNamesConstant } from '@school-v2/constant';
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
      {
        path: 'cn-danhmuc',
        loadChildren: () =>
          loadRemoteModule(
            getRemoteModule(RemoteEntryNamesConstant.DANHMUC)
          ).then((m) => m.RemoteEntryModule),
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
