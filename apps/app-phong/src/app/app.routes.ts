import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { AuthGuard } from '@school-v2/auth/utils/guards';

import { getRemoteModule, RemoteEntryNamesConstant } from '@school-v2/constant';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'management',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule(getRemoteModule(RemoteEntryNamesConstant.LOGIN)).then(
        (m) => m.RemoteEntryModule
      ),
  },

  {
    path: 'management',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule(getRemoteModule(RemoteEntryNamesConstant.MANAGEMENT)).then((m) => m.RemoteEntryModule),
  },
];
