import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseListComponent } from '@school-v2/shared/base';
// import { HrmSelectEnum } from '@school-v2/hrm-app/shared/controls/hrm-select/data-access';
// import { INhanSuCoQuan, TrangThaiDuLieuEnum } from '@school-v2/hrm-app/views/human-resource/data-access';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
// import { HrmUrlConstant } from '@school-v2/hrm-app/constants';
import { IPagedResult } from '@school-v2/shared/models';
// import { PermissionService } from '@school-v2/hrm-app/views/system/store';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ApiService, CustomTranslateService, NotificationService } from '@school-v2/shared/services';
import { ModalDeleteConfig, PageConfig, UrlConstant } from '@school-v2/constant';
import { DateUtil, SafeAny } from '@school-v2/shared/utils';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'add-permissions-to-role',
    templateUrl: './add-permissions-to-role.component.html',
    styleUrls: ['./add-permissions-to-role.component.scss'],
    // providers: [PermissionService]
})
export class ThemQuyenComponent extends BaseListComponent<any> implements OnInit, OnDestroy {
    idsGroupPermission: number[] = [];

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

    listQuyen =[
        {
        id: 1,
        itemQuyen: 'Quản lý cơ sở'
        },
        {
        id: 2,
        itemQuyen: 'Quản lý lớp'
        },
        {
        id: 3,
        itemQuyen: 'Hiệu trưởng'
        },
        {
        id: 4,
        itemQuyen: 'Giáo viên'
        },
        {
        id: 5,
        itemQuyen: 'Thủ quỹ'
        },
]

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

    // model: INhanSuCoQuan;
    // dropdownListEnum = HrmSelectEnum;

    roleOfTrees = [];

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        // private permissionService: PermissionService,
        private ref: WindowRef,
        injector: Injector
    ) {
        super(injector);
        this.pageHeight = this.pageHeight - 44;
    }

    private get query() {
        return {
            // pageNumber: this.gridState.skip / this.gridState.take + 1,
            // pageSize: this.gridState.take,
            // sortName: this.gridState.sort[0].field,
            // sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            idsCoQuan: this.modelSearch.coQuanId.join(','),
            maNhanSu: this.modelSearch.maNhanSu,
            hoTen: this.modelSearch.hoTen, 
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
            isDongBo: null,
        };
    }

    ngOnInit() {
        super.ngOnInit();
        // this.loadTreeGroupPermission();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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

    loadItems() {
        // this.isLoading = true;
        // this.gridView$ = this.apiService.post(UrlConstant.API.ACL_PERMISSION + '/GetUserGroupPermissions', this.query, true).pipe(
        //     map((res: IPagedResult<SafeAny>) => {
        //         if (res) {
        //             const arrayData = res.items;
        //             arrayData.forEach((element : any) => {
        //                 if (element.groupPemissions && element.groupPemissions.length > 0) {
        //                     element.groupPemission = [];
        //                     element.groupPemissionId = [];
        //                     element.groupPemissions.split('|').forEach((element2 : any)=> {
        //                         const temp = element2.split(',');
        //                         element.groupPemission.push({ id: temp[0], label: temp[1] });
        //                         element.groupPemissionId.push(temp[0]);
        //                     });
        //                 }
        //             });
        //             return {
        //                 data: arrayData,
        //                 total: res.pagingInfo?.totalItems,
        //             };
        //         } else {
        //             return {
        //                 data: [],
        //                 total: 0,
        //             };
        //         }
        //     }),
        //     tap(res => {
        //         if (res.total <= this.gridState.take!) {
        //             this.pageConfig = false;
        //         } else {
        //             this.pageConfig = {
        //                 buttonCount: 5,
        //                 pageSizes: [10, 20, 50, 100, 500, 1000, 2000, 10000],
        //                 previousNext: true,
        //             };
        //         }
        //     }),
        //     finalize(() => (this.isLoading = false))
        // );
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
                            // this.ref.close();
                        });
                },
                nzCancelText: ModalDeleteConfig.no
            });
            return;
        } else {
            this.notificationService.showWarningMessage(this.translate.get('MES.CREATE_PERMISSION_INVALID'));
        }
    }

    protected showFormCreateOrUpdate() {
        // code here
    }

    private loadTreeGroupPermission() {
        // this.permissionService
        //     .getGroupForTree(null, null)
        //     .pipe(
        //         tap(res => {
        //             this.roleOfTrees = res;
        //         }),
        //         takeUntil(this.destroyed$)
        //     )
        //     .subscribe();
    }
}
