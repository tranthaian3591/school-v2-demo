import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { INhanSuCoQuanChucVu, ITreeCoQuan } from '@school-v2/hrm-app/views/human-resource/data-access';
import { Observable } from 'rxjs';
import { GridDataResult, PagerSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { FormControl } from '@angular/forms';
// import { HrmSelectEnum } from '@school-v2/hrm-app/shared/controls/hrm-select/data-access';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { debounceTime, finalize, map, takeUntil, tap } from 'rxjs/operators';
// import { PageConfig, UrlConstant } from '@school-v2/constant';
// import { DestroyService } from '@school-v2/shared/services';
// import { DepartmentService } from '@school-v2/shared/state/department';
// import { INhanSuLazyLoad, SelectUserLazyEnum } from '@school-v2/shared/controls/select-user-lazy/data-access';
// import { ApiService } from '@school-v2/shared/services';
import { SafeAny } from '@school-v2/shared/utils';
// import { HrmUrlConstant } from '@school-v2/hrm-app/constants';

@Component({
    selector: 'modal-list-user',
    templateUrl: './modal-list-user.component.html',
    styleUrls: ['./modal-list-user.component.scss'],
    // providers: [DestroyService]
})
export class ModalListUserComponent implements OnInit, OnChanges {
    @Input() mode = 'default';
    // Search nhan su theo doi tuong trong DotDanhGia, chi lay nhung NS chua duoc chon trong dotDanhGiaChiTietId cua DotDanhGia
    @Input() dotDanhGiaChiTietId?: number;
    // Search nhan su theo doi tuong trong DotDanhGia, chi lay loai doiTuong de loc data
    @Input() doiTuongDanhGiaId?: number;
    // Áp dụng cho phiếu đánh giá, lọc cơ quan theo cơ quan quản lý của cá nhân
    @Input() isCoQuanQuanLy?: boolean;
    // Lọc nhân sự cho màn hình Kỳ đánh giá
    @Input() isNhanSuKyDanhGia?: boolean;
    // 0: lay het, 1: co quan chinh no, 2: lay theo co quan quan ly chinh no
    @Input() manHinh?: number;
    @Input() type?: number; // 1: Lọc nhân sự những nhân sự có chức vụ theo cơ quan cấp 1
    // @Input() keyControl: SelectUserLazyEnum;
    @Input() coQuanIds: string;
    @Input() coQuanId: number;
    @Input() isTest: boolean;

    // @Input() userSelecteds: INhanSuCoQuanChucVu[] = [];
    pageHeightTree = window.innerHeight - 250;
    pageHeightGrid = window.innerHeight - 270;

    // treeCoQuans: ITreeCoQuan[];
    // parsedData: ITreeCoQuan[];

    gridViewUser$: Observable<GridDataResult>;
    pageConfig: PagerSettings | boolean = false;
    isLoading = false;
    selectionIds: number[] = [];


    gridState: State = {
        sort: [{field: 'id', dir: 'desc'}],
        skip: 0,
        take: 20,
    };

    searchControl = new FormControl();
    doiTuongDanhGiaControl = new FormControl();

    // hrmSelectEnum = HrmSelectEnum;

    expandKey = [];
    // itemCoQuanSelected: ITreeCoQuan;
    searchValue = '';

    constructor(
        private ref: WindowRef,
        // private apiService: ApiService,
        // private departmentService: DepartmentService,
        // private destroy: DestroyService
    ) {
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
            // coQuanId: this.itemCoQuanSelected.coQuanId ?? this.coQuanId,
            dotDanhGiaChiTietId: this.dotDanhGiaChiTietId ?? null,
            keyword: this.searchControl.value,
            manHinh: this.manHinh ?? null,
            isCoQuanQuanLy: this.isCoQuanQuanLy ?? null,
            idDoiTuongDanhGia: this.doiTuongDanhGiaControl.value,
            type: this.type ? this.type : 0,
            // keyControl: this.keyControl,
        };
    }

    private get queryOptionKyDanhGias() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
            // coQuanId: this.itemCoQuanSelected.coQuanId,
            dotDanhGiaChiTietId: this.dotDanhGiaChiTietId ?? null,
            keyword: this.searchControl.value,
            manHinh: 3,
            isCoQuanQuanLy: this.isCoQuanQuanLy ?? null,
            idDoiTuongDanhGia: this.doiTuongDanhGiaControl.value,
            type: this.type ? this.type : 0,
            // keyControl: this.keyControl,
        };
    }

    ngOnChanges(changes: SimpleChanges) {
        const { keyControl } = changes;
    }

    ngOnInit(): void {
        // if (this.userSelecteds) {
        //     this.selectionIds = this.userSelecteds.map(x => x.nhanSuId);
        // }

        this.loadTreeCoQuan();
        if (this.doiTuongDanhGiaId) {
            this.doiTuongDanhGiaControl.setValue(this.doiTuongDanhGiaId);
        }

        // Input Change
        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });

        // Input Change
        this.doiTuongDanhGiaControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });
    }

    /**
     * Trees click
     * @param $event
     */
    treeClick($event) {
        if ($event.type === 'click') {
            const dataItem = $event.item?.dataItem;
            if (dataItem) {
                // set user
                if (!this.coQuanId) {
                    // this.itemCoQuanSelected = dataItem;
                }
                // get user trong co quan
                this.loadItemNhanSuByCoQuan();
            }
        }
    }

    loadItemNhanSuByCoQuan() {
        this.isLoading = true;
        // this.gridViewUser$ = this.apiService
        //     .read(HrmUrlConstant.API.HRM_NHAN_SU +  '/ByCoQuanKeyControl', this.isNhanSuKyDanhGia ? this.queryOptionKyDanhGias : this.queryOptions)
        //     .pipe(
        //         map((res: INhanSuLazyLoad) => {
        //             if (res && res.pagingItems && res.pagingItems.items) {
        //                 return {
        //                     data: res.pagingItems.items,
        //                     total: res.pagingItems.pagingInfo.totalItems,
        //                 };
        //             }
        //             return {
        //                 data: [],
        //                 total: 0,
        //             };
        //         }),
        //         tap(res => {
        //             if (res.total <= this.gridState.take) {
        //                 this.pageConfig = false;
        //             } else {
        //                 this.pageConfig = PageConfig;
        //             }
        //         }),
        //         finalize(() => (this.isLoading = false))
        //     );
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItemNhanSuByCoQuan();
    }

    onSelectNhanSu() {
        // this.emitValue(this.userSelecteds);
    }

    selectedNhanSuSingle(dataItem) {
        const nhanSus = [dataItem];
        // this.emitValue(nhanSus);
    }

    loadTreeCoQuan() {
        // this.departmentService
        //     .getDepartmentsForTree(this.manHinh, this.coQuanIds)
        //     .pipe(takeUntil(this.destroy.destroyed$))
        //     .subscribe(res => this.setTreeValue(res));
    }

    onkeyup(textSearch: string): void {
        // this.parsedData = this.search(this.treeCoQuans, textSearch);
    }

    cancel() {
        this.refresh();
        this.close();
    }

    refresh() {
        this.selectionIds = [];
        this.gridViewUser$ = null;
        this.gridState = {
            sort: [{field: 'id', dir: 'desc'}],
            skip: 0,
            take: 20,
        };
    }

    close() {
        this.ref.close();
    }

    selectRow(e: SelectionEvent) {
        if (e.deselectedRows.length > 0) {
            const deselectedRows = e.deselectedRows;
            deselectedRows.map(x => {
                // const index = this.userSelecteds.findIndex(y => x.dataItem.nhanSuId === y.nhanSuId);
                // if (index > -1) {
                //     this.userSelecteds.splice(index, 1);
                // }
            });
        }
        if (e.selectedRows.length > 0) {
            const selectedRows = e.selectedRows;
            selectedRows.map(x => {
                // this.userSelecteds.push(x.dataItem);
            });
        }
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKey = [null];
            // this.treeCoQuans = [{
            //     coQuanId: null,
            //     tenCoQuan: 'Cơ quan/Đơn vị',
            //     childrens: [...this.convertToTree(res, firstValue.capDonVi, 0)]
            // }];
            // this.parsedData = [...this.treeCoQuans];

            // // search
            // this.itemCoQuanSelected = this.treeCoQuans[0];
            // this.loadItemNhanSuByCoQuan();
        }
    }

    // private convertToTree(arr: ITreeCoQuan[], level, parentId): ITreeCoQuan[] {
    //     const tree = arr.filter(
    //         m => (m.capDonVi === level && parentId <= 0) || (m.capDonVi === level && m.coQuanTrucThuocId === parentId && parentId > 0)
    //     );
    //     if (tree.length > 0) {
    //         tree.map(item => {
    //             const childs = arr.filter(m => m.coQuanTrucThuocId === item.coQuanId);
    //             if (childs.length > 0) {
    //                 item.childrens = this.convertToTree(arr, item.capDonVi + 1, item.coQuanId);
    //             }
    //         });
    //     }

    //     return tree;
    // }

    private search(items: SafeAny[], textSearch: string): SafeAny[] {
        return items.reduce((acc, item) => {
            if (this.contains(item.tenCoQuan, textSearch)) {
                acc.push(item);
            } else if (item.childrens && item.childrens.length > 0) {
                const newItems = this.search(item.childrens, textSearch);

                if (newItems.length > 0) {
                    acc.push({
                        tenCoQuan: item.tenCoQuan,
                        coQuanId: item.coQuanId,
                        maCoQuan: item.maCoQuan,
                        coQuanTrucThuocId: item.coQuanTrucThuocId,
                        capDonVi: item.capDonVi,
                        childrens: newItems,
                    });
                }
            }
            return acc;
        }, []);
    }

    private contains(text: string, term: string): boolean {
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    // private emitValue(values: INhanSuCoQuanChucVu[]) {
    //     this.ref.close(values);
    // }
}
