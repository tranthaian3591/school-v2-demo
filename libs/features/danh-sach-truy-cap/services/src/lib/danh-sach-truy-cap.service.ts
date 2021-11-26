import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '@school-v2/shared/services';
import { IGetUserDevices } from '@school-v2/features/danh-sach-truy-cap/data-access';
import { IResponseBaseModel } from '@school-v2/shared/data-access';

@Injectable()
export class DanhSachTruyCapService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllUserDevice() {
    return this.get<IResponseBaseModel<IGetUserDevices[]>>('/userdevice/getbyall').pipe(
      map((x) => {
        return x.Result?.reverse();
      })
    );
  }
}
