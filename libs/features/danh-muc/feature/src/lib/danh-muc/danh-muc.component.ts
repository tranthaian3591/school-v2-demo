import { finalize, map, tap } from 'rxjs/operators';
import { Component, Injector,  OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DanhMucService } from '@school-v2/features/danh-muc/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormChucVuComponent } from '@school-v2/features/danh-muc/ui';
import { BaseListComponent } from '@school-v2/shared/base';
import { SafeAny } from '@school-v2/shared/utils';
import { IPagedResult } from '@school-v2/shared/models';
import {
  WindowCloseResult,
  WindowService,
} from '@progress/kendo-angular-dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalDeleteConfig, PageConfig } from '@school-v2/constant';
import { State } from '@progress/kendo-data-query';
@Component({
  selector: 'school-v2-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.scss'],
})
export class DanhMucComponent extends BaseListComponent<SafeAny> implements OnInit, OnDestroy  {
  maTinhThanh = '';
  tenTinhThanh = '';
  ngaySinh : any
  isVisible = false;
  dsTinhThanh$: Observable<any> | undefined;

  listData: any[] = [];

  constructor(
    private danhMucService: DanhMucService,
    private modal: NzModalService,
    injector: Injector,
    private windowService: WindowService,
    private notification: NzNotificationService
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
    this.dsTinhThanh$ = this.danhMucService.getDsTinhThanh()
    .pipe( 
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
    )
  }

  reload() {
    this.loadItems();
  } 

  addItem() {
    this.danhMucService
      .createTinhThanh(this.maTinhThanh, this.tenTinhThanh)
      .subscribe((res) => {
        this.dsTinhThanh$ = of([]);
        this.loadItems();
      });
  }

  createModal(): void {
    this.opened = true;
    const windowRef = this.windowService.open({
      title: 'Thêm Tỉnh thành',
      content: FormChucVuComponent,
      width: 550,
      top: 100,
      autoFocusedElement: 'body',
    });
    windowRef.result.subscribe(result => {
        if (result instanceof WindowCloseResult) {
            this.opened = false;
            this.loadItems();
        }
    });
  }

  edit(dataItem: any) {
    this.opened = true;
    const windowRef = this.windowService.open({
      title: 'Chỉnh sửa Tỉnh thành',
      content: FormChucVuComponent,
      width: 550,
      top: 100,
      autoFocusedElement: 'body',
    });
    windowRef.result.subscribe(result => { 
        if (result instanceof WindowCloseResult) {
            this.opened = false;
            this.loadItems();
        }
    });
  }

  removeHandler(id: any) {
    this.modal.confirm({
      nzTitle: ModalDeleteConfig.title,
      nzContent: ModalDeleteConfig.content,
      nzOkText: ModalDeleteConfig.yes,
      nzOkDanger: true,
      nzOnOk: () => {
        this.danhMucService.deleteTinhThanh(id).subscribe((result) => {
          if (result === true) {
            this.notification.success('Thông báo', 'Thành công');
          } else {
            this.notification.warning('Thông báo', 'Thất bại');
          }
          this.loadItems();
        });
      },
      nzCancelText: ModalDeleteConfig.no,
    });
  }

  pageChange(state: State): void {
    this.gridState = state;
    this.loadItems();
  }
}