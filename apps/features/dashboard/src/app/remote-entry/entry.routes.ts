import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { getRemoteModule, RemoteEntryNamesConstant } from '@school-v2/constant';
import { EntryComponent } from './entry.component';

export const ENTRY_ROUTES: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: '',
        redirectTo: 'danh-sach-truy-cap',
        pathMatch: 'full',
      },
      {
        path: 'danh-sach-truy-cap',
        loadChildren: () =>
          loadRemoteModule(
            getRemoteModule(RemoteEntryNamesConstant.DSTRUYCAP)
          ).then((m) => m.RemoteEntryModule),
      },
      {
        path: 'danh-muc',
        loadChildren: () =>
          loadRemoteModule(
            getRemoteModule(RemoteEntryNamesConstant.DANHMUC)
          ).then((m) => m.RemoteEntryModule),
      },
      {
        path: 'phan-quyen',
        loadChildren: () =>
          loadRemoteModule(
            getRemoteModule(RemoteEntryNamesConstant.PHANQUYEN)
          ).then((m) => m.RemoteEntryModule),
      },
      {
        path: 'nhom-quyen',
        loadChildren: () =>
          loadRemoteModule(
            getRemoteModule(RemoteEntryNamesConstant.NHOMQUYEN)
          ).then((m) => m.RemoteEntryModule),
      },
    ],
  },
];
