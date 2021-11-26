import { State } from '@progress/kendo-data-query';
import { Component, Injector } from '@angular/core';
import { DanhSachTruyCapService } from '@school-v2/features/danh-sach-truy-cap/services';
import { BaseListComponent } from '@school-v2/shared/base';
import { Observable } from 'rxjs';
import { SafeAny } from '@school-v2/shared/utils';
import { finalize, map, tap } from 'rxjs/operators';
import { PageConfig } from '@school-v2/constant';

@Component({
  selector: 'school-v2-danh-sach-truy-cap',
  templateUrl: './danh-sach-truy-cap.component.html',
  styleUrls: ['./danh-sach-truy-cap.component.css'],
})
export class DanhSachTruyCapComponent extends BaseListComponent<SafeAny> {
  dsUserDivice$: Observable<any> | undefined;

  constructor(
    private danhSachTruyCapService: DanhSachTruyCapService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected showFormCreateOrUpdate() {
    throw new Error('Method not implemented.');
  }
  protected loadItems() {
    this.dsUserDivice$ = this.danhSachTruyCapService.getAllUserDevice().pipe( 
      map((res: any) => {
        if (res) {
            return {
                data: res.slice(this.gridState.skip, this.gridState.skip! + this.gridState.take!),
                total: res.length,
            };
        } else {
            return {
                data: [],
                total: 0,
            };
        }
    }),
    tap(res => {
        if (res.total <= this.gridState.take!) {
            this.pageConfig = false;
        } else {
            this.pageConfig = PageConfig;
        }
    }),
    finalize(() => (this.isLoading = false))
    );
  }
 
  onStateChange(state: State): void {
    this.gridState = state;
    this.loadItems();
  }
}
