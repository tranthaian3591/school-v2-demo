import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { INhanSu, INhanSuCoQuanChucVu } from '@school-v2/hrm-app/views/human-resource/data-access';
import { debounceTime, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
// import { DestroyService } from '@school-v2/shared/services';
// import { ApiService } from '@school-v2/shared/services';
// import { HrmUrlConstant } from '@school-v2/hrm-app/constants';
import { ModalListUserComponent } from './modal-list-user/modal-list-user.component';
// import { INhanSuLazyLoad, SelectUserLazyEnum } from '@school-v2/shared/controls/select-user-lazy/data-access';
import { BehaviorSubject } from 'rxjs';
import { SafeAny } from '@school-v2/shared/utils';

@Component({
    selector       : 'select-user-lazy',
    templateUrl    : './select-user-lazy.component.html',
    styleUrls      : ['./select-user-lazy.component.scss'],
    providers      : [
        {
            provide    : NG_VALUE_ACCESSOR,
            multi      : true,
            useExisting: forwardRef(() => SelectUserLazyComponent),
        },
        // DestroyService
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectUserLazyComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() label: string;
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn nhân sự';
    @Input() mode = 'default';
    @Input() dotDanhGiaChiTietId?: number; // (optional) search nhan su theo doi tuong trong DotDanhGia, chi lay nhung NS chua duoc chon trong dotDanhGiaChiTietId cua DotDanhGia
    @Input() doiTuongDanhGiaId?: number; // (optional) search nhan su theo doi tuong trong DotDanhGia, chi lay loai doiTuong de loc data
    @Input() manHinh?: number; // 0: lay het, 1: co quan chinh no, 2: lay theo co quan quan ly chinh no   ,4: ,5:
    @Input() coQuanId?: number; // Chọn nhân sự theo cơ quan
    @Input() disabled?: boolean;
    @Input() isCoQuanQuanLy?: boolean; // áp dụng cho phiếu đánh giá, lọc cơ quan theo cơ quan quản lý của cá nhân
    @Input() isNhanSuKyDanhGia?: boolean; // Lọc nhân sự cho màn hình Kỳ đánh giá
    @Input() type?: number; // 1: Lọc nhân sự những nhân sự có chức vụ theo cơ quan cấp 1
    // @Input() keyControl: SelectUserLazyEnum;
    @Input() keyControl: any;
    @Input() isSearchServer = true;
    @Input() isTest = false; // test keyControl

    // @Output() change = new EventEmitter<INhanSuCoQuanChucVu[]>();
    // nhanSus: INhanSu[];
    // nhanSuCoQuanChucVus: INhanSuCoQuanChucVu[] = [];

    value: number[] | number;

    isLoading = false;
    searchChange$ = new BehaviorSubject('');

    private pageSize = 20;
    private pageNumber = 1;
    private totalItem = 0;
    private keyword: string;
    private currentOverlayZindex: string;
    private coQuanIds: string;
    private isFirstLoad = false;

    constructor(
        // private apiService: ApiService,
        private windowService: WindowService,
        // private destroy: DestroyService,
        private cdr: ChangeDetectorRef
    ) {
    }

    // tslint:disable-next-line:ban-types
    onTouched = () => {
        // code here
    };

    ngOnChanges(changes: SimpleChanges) {
        const {
                  coQuanId,
                  keyControl
              } = changes;
        if (coQuanId && !coQuanId.firstChange) {
            this.loadNhanSus();
        }

        if (keyControl) {
            // code here
        }
    }

    ngOnInit() {
        // this.searchChange$
        //     .asObservable()
        //     .pipe(debounceTime(this.isFirstLoad ? 0 : 500))
        //     .pipe(switchMap(_ => this.loadNhanSuSearch())).pipe(
        //     takeUntil(this.destroy.destroyed$)
        // ).subscribe();
    }

    registerOnChange(fn: never) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: never) {
        this.onTouched = fn;
    }

    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }

    loadNhanSuSearch() {
        // this.pageNumber = 1;
        // this.isLoading = true;
        // return this.apiService
        //            .read(HrmUrlConstant.API.HRM_NHAN_SU + '/ByCoQuanKeyControl', {
        //                idNhanSusSelected: this.value ? this.value.toString() : null,
        //                pageNumber       : this.pageNumber,
        //                pageSize         : this.pageSize,
        //                keyword          : this.keyword ?? '',
        //                manHinh          : this.isNhanSuKyDanhGia ? 3 : this.manHinh,
        //                coQuanId         : this.coQuanId ?? null,
        //                isCoQuanQuanLy   : this.isCoQuanQuanLy ?? null,
        //                type             : this.type ?? 0,
        //                keyControl       : this.keyControl,
        //            }).pipe(
        //     map((res: INhanSuLazyLoad) => {
        //         // set isFirstLoad
        //         if (!this.isFirstLoad) {
        //             this.coQuanIds = res.idsCoQuanForControl;
        //             this.isFirstLoad = true;
        //         }
        //         this.totalItem = res.pagingItems.pagingInfo.totalItems ?? 0;
        //         if (this.pageNumber > 1) {
        //             return res.pagingItems.items;
        //         } else {
        //             // reset value
        //             this.nhanSuCoQuanChucVus = [];
        //             let nhanSus = [];
        //             if (res.nhanSusSelected) {
        //                 const ids = this.nhanSuCoQuanChucVus.map(x => x.nhanSuId);
        //                 nhanSus = res.nhanSusSelected.filter(x => !ids.includes(x.nhanSuId));
        //                 nhanSus = nhanSus.concat(res.pagingItems.items);
        //             }
        //             return nhanSus;
        //         }
        //     }),
        //     tap(res => {
        //         this.nhanSuCoQuanChucVus = [...this.nhanSuCoQuanChucVus, ...res];
        //         this.cdr.markForCheck();

        //     }),
        //     finalize(() => this.isLoading = false));
    }

    onChangeModel(value) {
        // this.onChangeCallback(value);
        // // this.userSelected = [];
        // if (this.mode === 'default') {
        //     const results = this.nhanSuCoQuanChucVus.filter(n => n.nhanSuId === value);
        //     this.change.emit(results);
        // } else {
        //     if (Array.isArray(value) && value.length > 0) {
        //         const results = this.nhanSuCoQuanChucVus.filter(n => value.includes(n.nhanSuId));
        //         this.change.emit(results);
        //     }
        // }
    }

    showModalListUser() {
        if (!this.coQuanIds) {
            return;
        }
        const windowRef = this.windowService.open({
            title      : 'Chọn nhân sự',
            content    : ModalListUserComponent,
            width      : 1500,
            height     : 800,
            top        : 10,
            state      : 'maximized',
            keepContent: true,
        });
        const param = windowRef.content.instance;
        param.doiTuongDanhGiaId = this.doiTuongDanhGiaId;
        param.dotDanhGiaChiTietId = this.dotDanhGiaChiTietId;
        param.mode = this.mode;
        param.isCoQuanQuanLy = this.isCoQuanQuanLy;
        param.isNhanSuKyDanhGia = this.isNhanSuKyDanhGia;
        param.manHinh = this.manHinh;
        param.coQuanId = this.coQuanId;
        param.type = this.type;
        // param.keyControl = this.keyControl;
        param.coQuanIds = this.coQuanId ? this.coQuanId.toString() : this.coQuanIds;
        param.isTest = this.isTest;

        // set users selected
        if (this.value) {
            const nhanSuIds = this.mode === 'default' ? [this.value] : this.value as number[];
            // param.userSelecteds = this.nhanSuCoQuanChucVus.filter(x => nhanSuIds.includes(x.nhanSuId));
        }

        this.cdr.markForCheck();

        windowRef.result.subscribe((result) => {
            // if (result instanceof WindowCloseResult) {
            // } else {
            //     if (result) {
            //         (result as INhanSuCoQuanChucVu[]).map(x => {
            //             const nhanSuIds = this.nhanSuCoQuanChucVus.map(n => n.nhanSuId);
            //             if (!nhanSuIds.includes(x.nhanSuId)) {
            //                 this.nhanSuCoQuanChucVus.unshift(x);
            //             }
            //         });
            //         if (this.mode === 'default') {
            //             this.value = (result as INhanSuCoQuanChucVu[])[0].nhanSuId;
            //         } else {
            //             this.value = (result as INhanSuCoQuanChucVu[]).map(x => x.nhanSuId);
            //         }
            //         this.onChangeCallback(this.value);
            //         // emit value to outner component
            //         this.change.emit(result);
            //         // mark change detection
            //         this.cdr.markForCheck();
            //     }
            // }
        });
    }

    loadNhanSus() {
        this.isLoading = true;
        // this.apiService
        //     .read(HrmUrlConstant.API.HRM_NHAN_SU + '/ByCoQuanKeyControl', {
        //         idNhanSusSelected: this.value ? this.value.toString() : null,
        //         pageNumber       : this.pageNumber,
        //         pageSize         : this.pageSize,
        //         keyword          : this.keyword ?? '',
        //         manHinh          : this.isNhanSuKyDanhGia ? 3 : this.manHinh,
        //         coQuanId         : this.coQuanId ?? null,
        //         isCoQuanQuanLy   : this.isCoQuanQuanLy ?? null,
        //         type             : this.type ?? 0,
        //         keyControl       : this.keyControl,
        //     }).pipe(
        //     map((res: INhanSuLazyLoad) => {
        //         this.totalItem = res.pagingItems.pagingInfo.totalItems ?? 0;
        //         if (this.pageNumber > 1) {
        //             return res.pagingItems.items;
        //         } else {
        //             // reset value
        //             this.nhanSuCoQuanChucVus = [];
        //             let nhanSus = [];
        //             if (res.nhanSusSelected) {
        //                 const ids = this.nhanSuCoQuanChucVus.map(x => x.nhanSuId);
        //                 nhanSus = res.nhanSusSelected.filter(x => !ids.includes(x.nhanSuId));
        //                 nhanSus = nhanSus.concat(res.pagingItems.items);
        //             }
        //             return nhanSus;
        //         }
        //     }),
        //     tap(res => {
        //         this.nhanSuCoQuanChucVus = [...this.nhanSuCoQuanChucVus, ...res];
        //         this.cdr.markForCheck();

        //     }),
        //     finalize(() => this.isLoading = false),
        //     takeUntil(this.destroy.destroyed$)
        // ).subscribe();
    }

    onSearch(value: string): void {
        this.keyword = value;
        // this.loadNhanSus();
        this.searchChange$.next(value);
    }

    loadMore(): void {
        this.pageNumber++;
        if (this.totalItem > this.pageSize * this.pageNumber) {
            this.loadNhanSus();
        }
    }

    private onChangeCallback: (_: SafeAny) => void = () => {
        // code here
    };
}
