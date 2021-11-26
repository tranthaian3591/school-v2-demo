import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '@school-v2/shared/services';
import {
  IRequestCreateDanhMucModel,
  IResponseCreateDanhMucModel,
  IGetDanhMucModel,
  IResponseDeleteDanhMucModel,
} from '@school-v2/features/danh-muc/data-access';
import { IResponseBaseModel } from '@school-v2/shared/data-access';

@Injectable()
export class DanhMucService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * Lay all tinh thanh
   * @returns IGetDanhMucModel[]
   */
  getDsTinhThanh() {
    return this.get<IResponseBaseModel<IGetDanhMucModel[]>>(
      '/danhmuctinhthanh/getbyallasync'
    ).pipe(
      map((x) => {
        return x.Result?.reverse();
      })
    );
  }

  /**
   * Tao Tinh Thanh
   * @param maTinhThanh
   * @param tenTinhThanh
   * @returns true or false
   */
  createTinhThanh(maTinhThanh: string, tenTinhThanh: string) {
    const model: IRequestCreateDanhMucModel = {
      MaTinhThanh: maTinhThanh,
      TenTinhThanh: tenTinhThanh,
    };

    return this.post<IResponseBaseModel<IResponseCreateDanhMucModel>>(
      '/danhmuctinhthanh/createtinhthanh',
      model
    ).pipe(map((x) => x.Result));
  }

  /**
   * Xoa tinh thanh
   * @param id : id tinh thanh
   * @returns true or false
   */
  deleteTinhThanh(id: number) {
    return this.delete<IResponseBaseModel<IResponseDeleteDanhMucModel>>(
      '/danhmuctinhthanh/deletetinhthanh',
      id
    ).pipe(map((x) => x.Result));
  }
}
