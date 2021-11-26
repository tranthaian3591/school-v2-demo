import { IRemoteEntryModule } from '@school-v2/shared/models';
import { RemoteEntryNamesConstant } from './remote-entry-names.constant';
import { environment } from '@school-v2/shared/environments';
export function getRemoteModule(remoteName: string) {
  return RemoteEntryModulesConstant.find((x) => x.remoteName === remoteName);
}

export const RemoteEntryModulesConstant: IRemoteEntryModule[] = [
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4204/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.LOGIN,
  },
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4205/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.MANAGEMENT,
  },
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4203/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.DSTRUYCAP,
  },
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4202/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.DANHMUC,
  },
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4206/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.PHANQUYEN,
  },
  {
    exposedModule: './Module',
    remoteEntry: `${environment.host}:4207/remoteEntry.js`,
    remoteName: RemoteEntryNamesConstant.NHOMQUYEN,
  },
];
