import { ThemQuyenComponent } from '@school-v2/features/phan-quyen/ui';
import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable, UrlConstant } from '@school-v2/constant';
import { State } from '@progress/kendo-data-query';
// import { INhanSuCoQuan, KEY_STORE_HRM, TrangThaiDuLieuEnum } from '@school-v2/hrm-app/views/human-resource/data-access';
// import { HrmSelectEnum } from '@school-v2/hrm-app/shared/controls/hrm-select/data-access';
import { DateUtil, SafeAny, SecurityUtil } from '@school-v2/shared/utils';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ApiService, CustomTranslateService, FileService, NotificationService } from '@school-v2/shared/services';
import { WindowService } from '@progress/kendo-angular-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal'; 
import { BaseListComponent } from '@school-v2/shared/base';
import { Observable, throwError } from 'rxjs'; 

enum ExportEnum {
    ExportExcel,
    ExportNhanSuSSO,
}
@Component({
  selector: 'school-v2-phan-quyen',
  templateUrl: './phan-quyen.component.html',
  styleUrls: ['./phan-quyen.component.scss'],
})
export class PhanQuyenComponent extends BaseListComponent<SafeAny> {
  exportEnum = ExportEnum;
  idsGroupPermission: number[] = []; 
  dropdownListEnum : any; 
  listPhanQuyen =
  [
  {
    maNhanSu : '0001',
    userName : 'admin',
    hoDem : 'Thầy',
    ten : 'Nhung Lê Lợi',
    tenGioiTinh : 'Nam',
    ngaySinh : '11/5/1979',
    tenCoQuan : 'Trường THCS Lê Lợi',
    groupPemissions : [
        { 
        label: 'Hiệu trưởng'
        },
        { 
        label: 'Giáo viên'
        },
        { 
        label: 'Quản lý'
        },
    ]
  }
  ];
  
  
  // hrmkeyStore = KEY_STORE_HRM;

  modelSearch = {
      keyword: '',
      maNhanSu: null,
      hoTen: null,
      soDienThoai: null,
      loaiNhanSuId: null,
      loaiHopDongId: null,
      trangThaiNhanSuId: null,
      chucVuId: null,
      chucDanhId: null,
      ngachId: null,
      quocTichId: null,
      danTocId: null,
      tonGiaoId: null,
      coQuanId: [],
      idGioiTinh: null,
      ngaySinh: null,
      isPhanQuyen: null,
      idsGroupPermission: [],
  };

  // dropdownListEnum = HrmSelectEnum;

  constructor( 
      private apiService: ApiService,
      private windowService: WindowService,
      private notificationService: NotificationService,
      private modal: NzModalService,
      private fileService: FileService,
      private router: Router,
      private route: ActivatedRoute,
      private translate: CustomTranslateService,
      injector: Injector
  ) {
      super(injector);
  }

  private get query() {
      return {
          pageNumber: this.gridState.skip! / this.gridState.take! + 1,
          pageSize: this.gridState.take!,
          sortName: this.gridState.sort![0].field,
          sortASC: this.gridState.sort![0].dir === 'asc',
          keyword: this.modelSearch.keyword,
          idsCoQuan: this.modelSearch.coQuanId.join(','),
          maNhanSu: this.modelSearch.maNhanSu,
          hoTen: this.modelSearch.hoTen,
          // soDienThoai: this.modelSearch.soDienThoai ? this.modelSearch.soDienThoai.toString() : null,
          // idsLoaiHopDong: this.modelSearch.loaiHopDongId ? this.modelSearch.loaiHopDongId.toString() : null,
          // idsTrangThaiNhanSu: this.modelSearch.trangThaiNhanSuId ? this.modelSearch.trangThaiNhanSuId.toString() : null,
          // idsChucVu: this.modelSearch.chucVuId ? this.modelSearch.chucVuId.toString() : null,
          // idsChucDanh: this.modelSearch.chucDanhId ? this.modelSearch.chucDanhId.toString() : null,
          // idsQuocTich: this.modelSearch.quocTichId ? this.modelSearch.quocTichId.toString() : null,
          // idsNgach: this.modelSearch.ngachId ? this.modelSearch.ngachId.toString() : null,
          // idsTonGiao: this.modelSearch.tonGiaoId ? this.modelSearch.tonGiaoId.toString() : null,
          // idsDanToc: this.modelSearch.danTocId ? this.modelSearch.danTocId.toString() : null,
          // idsLoaiNhanSu: this.modelSearch.loaiNhanSuId ? this.modelSearch.loaiNhanSuId.toString() : null,
          idGioiTinh: this.modelSearch.idGioiTinh ? this.modelSearch.idGioiTinh : null,
          ngaySinh: this.modelSearch.ngaySinh ? DateUtil.getFullDate(this.modelSearch.ngaySinh) : null,
          isPhanQuyen: this.modelSearch.isPhanQuyen !== null ? this.modelSearch.isPhanQuyen : null,
          idsGroupPermission: this.modelSearch.idsGroupPermission.join(','),

          isGiangVien: null,
          isNghienCuuVien: null,
          isThamGiaNVCL: null,
          isThamGiaGiangDayCL: null,
          isThamGiaQuanLyCL: null,
          isQuanLyCSVC: null,
          isQuanLySach: null,
          // idTrangThaiDuLieu: TrangThaiDuLieuEnum.SU_DUNG_CHINH,
          isDongBo: null,
      };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
      this.pageHeight = window.innerHeight - (ReziseTable);
  }

  ngOnInit() {
      super.ngOnInit();
      // this.route.queryParams.subscribe(() => {
      //     const queryOption = JSON.parse(localStorage.getItem(this.hrmkeyStore.TRA_CUU_NHAN_SU));
      //     if(queryOption){
      //         this.modelSearch.keyword = queryOption.keyword;
      //         this.modelSearch.maNhanSu = queryOption.maNhanSu;
      //         this.modelSearch.hoTen = queryOption.hoTen;
      //         this.modelSearch.soDienThoai = queryOption.soDienThoai;
      //         this.modelSearch.loaiNhanSuId = queryOption.idsLoaiNhanSu ? parseInt(queryOption.idsLoaiNhanSu, 10) : null;
      //         this.modelSearch.loaiHopDongId = queryOption.idsLoaiHopDong ? parseInt(queryOption.idsLoaiHopDong, 10) : null;
      //         this.modelSearch.trangThaiNhanSuId = queryOption.idsTrangThaiNhanSu ? parseInt(queryOption.idsTrangThaiNhanSu, 10) : null;
      //         this.modelSearch.chucVuId = queryOption.idsChucVu ? parseInt(queryOption.idsChucVu, 10) : null;
      //         this.modelSearch.chucDanhId = queryOption.idsChucDanh ? parseInt(queryOption.idsChucDanh, 10) : null;
      //         this.modelSearch.ngachId = queryOption.idsNgach ? parseInt(queryOption.idsNgach, 10) : null;
      //         this.modelSearch.quocTichId = queryOption.idsQuocTich ? parseInt(queryOption.idsQuocTich, 10) : null;
      //         this.modelSearch.danTocId = queryOption.idsDanToc ? parseInt(queryOption.idsDanToc, 10) : null;
      //         this.modelSearch.tonGiaoId = queryOption.idsTonGiao ? parseInt(queryOption.idsTonGiao, 10) : null;
      //         this.modelSearch.idGioiTinh = queryOption.idGioiTinh ? parseInt(queryOption.idGioiTinh, 10) : null;
      //         this.modelSearch.ngaySinh = queryOption.ngaySinh;
      //         this.gridState.skip = (queryOption.pageNumber - 1) * queryOption.pageSize;
      //         this.gridState.take = queryOption.pageSize;
      //         this.gridState.sort[0].field = queryOption.sortName;
      //         this.gridState.sort[0].dir = queryOption.sortASC ? 'asc' : 'desc';
      //         if (queryOption.idsCoQuan) {
      //             this.modelSearch.coQuanId = [];
      //             const listCoQuanId = queryOption.idsCoQuan.split(',');
      //             listCoQuanId.map(x => {
      //                 this.modelSearch.coQuanId.push(x);
      //             });
      //         } else {
      //             this.modelSearch.coQuanId = [];
      //         }
      //         localStorage.removeItem(this.hrmkeyStore.TRA_CUU_NHAN_SU);
      //     } 
      //     this.loadItems();
      // });
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  showFormSetRole() {
      this.opened = true;
      const windowRef = this.windowService.open({
          title: `Thêm vai trò cho người dùng`,
          content: ThemQuyenComponent,
          width: 700,
          top: 10,
          state: 'maximized',
          autoFocusedElement: 'body',
      });

      const param = windowRef.content.instance;
      param.nhanSuSelectionIds = this.selectionIds;

      windowRef.result.subscribe(result => {
          this.loadItems();
          this.opened = false;
      });
  }

  showPermissionOfUser(dataItem : any) {
      this.opened = true;
      const windowRef = this.windowService.open({
          title: `Quyền nhân sự: ${dataItem.hoDem + ' ' + dataItem.ten}`,
          // content: ListPermissionOfUserComponent,
          width: 700,
          top: 10,
          state: 'maximized',
          autoFocusedElement: 'body',
      });

      const param = windowRef.content.instance;
      param.nhanSuSelectionIds = this.selectionIds;
      param.idUser = dataItem.idUser;

      windowRef.result.subscribe(result => {
          this.loadItems();
          this.opened = false;
      });
  }


  onStateChange(state: State) {
      this.gridState = state;
      this.loadItems();
  }

  searchHandler() {
      this.gridState.skip = 0;
      this.loadItems();
  }

  refreshHandler() {
      this.modelSearch = {
          keyword: '',
          maNhanSu: null,
          hoTen: null,
          soDienThoai: null,
          loaiNhanSuId: null,
          loaiHopDongId: null,
          trangThaiNhanSuId: null,
          chucVuId: null,
          chucDanhId: null,
          ngachId: null,
          quocTichId: null,
          danTocId: null,
          tonGiaoId: null,
          coQuanId: [],
          idGioiTinh: null,
          ngaySinh: null,
          isPhanQuyen: null,
          idsGroupPermission: [],
      };
  }

  onSearchChange() {
      this.gridState.skip = 0;
      this.loadItems();
  }

  onPermission(isRemove: boolean) {
      if (this.selectionIds.length > 0 && this.idsGroupPermission.length > 0) {
          let content = '';
          let mesSuccess = '';
          if (isRemove) {
              content = this.translate.get('CATALOG.PERMISSION.REMOVE');
              mesSuccess = this.translate.get('MES.REMOVE_PERMISSION_DONE');
          } else {
              content = this.translate.get('CATALOG.PERMISSION.ADD-APPROVE');
              mesSuccess = this.translate.get('MES.CREATE_PERMISSION_DONE');
          }
          const body = {
              idsGroupPermission: this.idsGroupPermission,
              idsUser: this.selectionIds,
              isRemovePermission: isRemove,
          };
          this.modal.confirm({
              nzTitle: this.translate.get('CATALOG.PERMISSION.NOTI'),
              nzContent: content,
              nzOkText: ModalDeleteConfig.yes,
              nzOnOk: () => {
                  this.apiService
                      .post(UrlConstant.API.ACL_PERMISSION + '/SavePermissions', body)
                      .pipe(takeUntil(this.destroyed$))
                      .subscribe(() => {
                          this.loadItems();
                          this.notificationService.showSuccessMessage(mesSuccess);
                      });
              },
              nzCancelText: ModalDeleteConfig.no
          });
          return;
      } else {
          this.notificationService.showWarningMessage(this.translate.get('MES.CREATE_PERMISSION_INVALID'));
      }
  }

  removePermissionItem(idItem: string, idPermission: number) {
      const content = this.translate.get('CATALOG.PERMISSION.REMOVE');
      const mesSuccess = this.translate.get('MES.REMOVE_PERMISSION_DONE');
      const body = {
          // tslint:disable-next-line:radix
          idsGroupPermission: [parseInt(idItem)],
          idsUser: [idPermission],
          isRemovePermission: true,
      };

      this.modal.confirm({
          nzTitle: this.translate.get('CATALOG.PERMISSION.NOTI'),
          nzContent: content,
          nzOkText: ModalDeleteConfig.yes,
          nzOnOk: () => {
              this.apiService
                  .post(UrlConstant.API.ACL_PERMISSION + '/SavePermissions', body)
                  .pipe(takeUntil(this.destroyed$))
                  .subscribe(() => {
                      this.loadItems();
                      this.notificationService.showSuccessMessage(mesSuccess);
                  });
          },
          nzCancelText: ModalDeleteConfig.no
      });
  }

  loadItems() {
    //   this.isLoading = true;
    //   this.gridView$ = this.apiService.post(UrlConstant.API.ACL_PERMISSION + '/GetUserGroupPermissions', this.query, true).pipe(
    //       map(res => {
    //           if (res) {
    //               const arrayData = res.items;
    //               arrayData.forEach((element : any) => {
    //                   if (element.groupPemissions && element.groupPemissions.length > 0) {
    //                       element.groupPemission = [];
    //                       element.groupPemissionId = [];
    //                       element.groupPemissions.split('|').forEach((element2 : any) => {
    //                           const temp = element2.split(',');
    //                           element.groupPemission.push({id: temp[0], label: temp[1]});
    //                           element.groupPemissionId.push(temp[0]);
    //                       });
    //                   }
    //               });
    //               return {
    //                   data: arrayData,
    //                   total: res.pagingInfo?.totalItems,
    //               };
    //           } else {
    //               return {
    //                   data: [],
    //                   total: 0,
    //               };
    //           }
    //       }),
    //       tap(res => {
    //           if (res.total <= this.gridState.take!) {
    //               this.pageConfig = false;
    //           } else {
    //               this.pageConfig = PageConfig;
    //           }
    //       }),
    //       finalize(() => (this.isLoading = false))
    //   );
  }

  protected showFormCreateOrUpdate() {
      throwError('');
  }
}
