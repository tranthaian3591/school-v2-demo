import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Injector, Input, OnChanges, OnDestroy, OnInit,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs'; 
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { AscSelectEnum } from '@school-v2/shared/controls/asc-select/data-access';  
import { OnChangeType, OnTouchedType } from '@school-v2/shared/utils';
export interface AscSelectOption {
    id: number;
    text: string
}

@Component({
    selector: 'asc-nx-asc-select',
    templateUrl: './asc-select.component.html',
    styleUrls: ['./asc-select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AscSelectComponent),
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AscSelectComponent<T> implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() modeOfDropDowList!: T | AscSelectEnum;
    @Input() placeHolder!: string;
    @Input() isReference = false;
    @Input() referenceId?: string;
    @Input() selected?: number;
    @Input() mode : any = 'default';
    @Input() isDisabled = false;
    @Input() isAllowClear = true;
    value!: string;
    listOfOption: AscSelectOption[] = [];
    selectedValue!: number;
    reference!: string;
    isLoading = false;
    isDisabledLocal = false;
    protected fieldSortOfCatalog = 'stt'; 
    protected cdr: ChangeDetectorRef;
    protected destroyed$ = new Subject();

    constructor(
        injector: Injector
    ) {
        this.cdr = injector.get(ChangeDetectorRef);
    }

    get queryOptionsCatalog() {
        return {
            pageSize: 100,
            pageNumber: 1,
            sortName: 'Id',
            sortAsc: true,
            keyword: '',
        };
    }

    onChange: OnChangeType = () => {};
    onTouched: OnTouchedType = () => {};

    writeValue(value : any): void {
        this.value = value;
        this.cdr.markForCheck();
    }

    registerOnChange(fn: OnChangeType): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedType): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabledLocal = isDisabled;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.referenceId) {
            this.reference = changes.referenceId.currentValue;
            if(this.isDisabled === false){
                this.isDisabledLocal = !(this.reference && this.isReference);
            }
            if (this.reference === null || this.reference === undefined) { 
                    this.value = ''; 
                this.writeValue(this.value);
            }

            if (!changes.referenceId.firstChange && changes.referenceId.currentValue !== changes.referenceId.previousValue) {
                // this.value = null;
                this.writeValue(this.value);
            }
            this.init();
        }
        if(this.isDisabled === true){
            this.isDisabledLocal = true;
        }
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    init() {
        switch (this.modeOfDropDowList) {
            case AscSelectEnum.TRANGTHAITHONGBAO:
                this.loadTrangThaiThongBao();
                break;
            case AscSelectEnum.TRANGTHAIXEM:
                this.loadTrangThaiXem();
                break;
            case AscSelectEnum.TINHCHATTHONGBAO:
                this.loadTinhChatThongBao();
                break;
            case AscSelectEnum.LOAITHONGBAO:
                this.loadLoaiThongBao();
                break;
        }
    }

    loadTrangThaiThongBao() {
        this.listOfOption = [
            {
                id: 0,
                text: 'Tất cả',
            },
            {
                id: 1,
                text: 'Còn hạn',
            },
            {
                id: 2,
                text: 'Hết hạn',
            },
        ];
    }

    loadTrangThaiXem() {
        this.listOfOption = [
            {
                id: 0,
                text: 'Tất cả',
            },
            {
                id: 1,
                text: 'Đã xem',
            },
            {
                id: 2,
                text: 'Chưa xem',
            },
        ];
    }

    loadTinhChatThongBao() {
        this.isLoading = true;
        // this.apiService
        //     .read(`${UrlConstant.API.THONG_BAO_TINH_CHAT}/ThongBaoTinhChatByFilters`, this.queryOptionsCatalog)
        //     .pipe(
        //         map(res => {
        //             if (res) {
        //                 return res.items;
        //             }
        //             return [];
        //         }),
        //         tap(res => {
        //             this.listOfOption = res.map(m => {
        //                 return {
        //                     id: m.id,
        //                     text: m.tenTinhChat,
        //                 };
        //             });
        //         }),
        //         finalize(() => (this.isLoading = false))
        //     )
        //     .pipe(takeUntil(this.destroyed$))
        //     .subscribe();
    }
 

    loadLoaiThongBao() {
        this.listOfOption = [
            {
                id: 1,
                text: 'Thông báo chung',
            },
            {
                id: 2,
                text: 'Đơn vị',
            },
            {
                id: 3,
                text: 'Phòng ban',
            },
            {
                id: 4,
                text: 'Trường',
            },
        ];
    }
}
