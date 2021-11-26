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
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { map, takeUntil } from 'rxjs/operators';
// import { ITreeSelect } from '@school-v2/shared/controls/select-department-tree/data-access';
// import { DepartmentService } from '@school-v2/shared/state/department';
// import { DestroyService } from '@school-v2/shared/services';
// import { ITreeCoQuan } from '@school-v2/hrm-app/views/human-resource/data-access';
import { OnChangeType, OnTouchedType, SafeAny } from '@school-v2/shared/utils';

@Component({
    selector: 'select-department-tree',
    templateUrl: './select-department-tree.component.html',
    styleUrls: ['./select-department-tree.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectDepartmentTreeComponent),
        },
        // DestroyService,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDepartmentTreeComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() label: string;
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn cơ quan';
    @Input() isMultiple = true;
    @Input() isLoadCapDonVi = false;
    @Input() isDisabled = false;
    @Input() coQuanChaId: number; // Dùng cho load cơ quan cấp 2
    @Input() capCoQuan: number | 0; // 0: Lấy hết, 
                                    // 1: Cơ quan chính nó, full cấp 1
                                    // 2: Cơ quan cấp 2, 
                                    // 6: lấy cơ quan cấp 1 chính nó
                                    // 7: Cấu hình cho module tuyển dụng, 
                                    // 8: lấy các cơ quan cấp 1 và full của cơ quan
                                    // 9: 
    @Input() isCheckStrictly = false; // không phụ thuộc node parent - children
    @Input() isDisabledParentNode = false;

    @Output() selected: string;
    @Output() change = new EventEmitter<SafeAny>();
    value: Array<string> | string;

    treeCoQuans: NzTreeNodeOptions[] = [];

    expandKeys = [];
    isLoading = false;

    constructor(
        // private departmentService: DepartmentService,
        // private destroy: DestroyService,
        private cdr: ChangeDetectorRef
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: OnChangeType = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouched: OnTouchedType = () => { };

    ngOnChanges(changes: SimpleChanges) {
        const { userSelectedIds } = changes;
        if (
            userSelectedIds &&
            userSelectedIds.currentValue.length === 0
        ) {
            this.value = [];
            this.writeValue(this.value);
        }
    }

    registerOnChange(fn: OnChangeType) {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedType) {
        this.onTouched = fn;
    }

    writeValue(obj) {
        if (typeof obj === 'number') {
            this.value = obj.toString();
        } else {
            this.value = obj || [];
        }

        this.userSelectedIds = obj || [];
        this.cdr.detectChanges();
    }

    checkedChange($event) {
        if (this.isCheckStrictly) {
            const currentNode = $event.node as NzTreeNode;
            let isChecked = currentNode.origin.checked;
            switch ($event.eventName) {
                case 'click':
                    isChecked = !isChecked;
                    currentNode.getChildren().map((item) => {
                        item.isChecked = isChecked;
                    });
                    break;
                case 'check':
                    // currentNode.getChildren().map((item) => {
                    //     item.isChecked = isChecked;
                    // });
                    this.recursionChecked(currentNode, isChecked);
                    break;
            }
        }else{
           this.change.emit($event.node)
        }
    }

    recursionChecked(node: NzTreeNode, isChecked: boolean) {
        node.getChildren().forEach(element => {
            element.isChecked = isChecked;
            if (element.getChildren().length > 0) {
                this.recursionChecked(element, isChecked);
            }
        });
    }

    ngOnInit(): void {
        this.loadTreeCoQuan();
    }

    private loadTreeCoQuan() {
        // this.departmentService
        //     .getDepartments(this.capCoQuan)
        //     .pipe(
        //         map((res) => this.setTreeValue(res)),
        //         takeUntil(this.destroy.destroyed$)
        //     )
        //     .subscribe();
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKeys = [firstValue.coQuanId.toString()];
            // this.treeCoQuans = this.convertToTree(res, firstValue.capDonVi, 0);

            // Lọc theo cơ quan cấp 2
            if (this.capCoQuan === 2) {
                this.treeCoQuans = this.treeCoQuans[0].children.filter(m => Number.parseInt(m.value) === this.coQuanChaId);
                if (this.treeCoQuans && this.treeCoQuans.length > 0) {
                    this.expandKeys = [this.treeCoQuans[0].value];
                }
            }
            this.cdr.detectChanges();
        }
    }

    // private convertToTree(
    //     arr: ITreeCoQuan[],
    //     level: number,
    //     parentId: number
    //         ): ITreeSelect[] {
    //     const treeSelect: ITreeSelect[] = arr
    //         .filter(
    //             (m) =>
    //                 (m.capDonVi === level && parentId <= 0) ||
    //                 (m.capDonVi === level && m.coQuanTrucThuocId === parentId && parentId > 0)
    //         )
    //         .filter(
    //             (m) => (this.isLoadCapDonVi && m.capDonVi < 2) || !this.isLoadCapDonVi
    //         )
    //         .map((m) => {
    //             return {
    //                 title: m.tenCoQuan,
    //                 value: m.coQuanId.toString(),
    //                 key: m.coQuanId.toString(),
    //                 capDonVi: m.capDonVi,
    //                 coQuanTrucThuocId: m.coQuanTrucThuocId,
    //                 expanded: false,
    //                 children: [],
    //                 isLeaf: false,
    //             };
    //         });

    //     if (treeSelect.length > 0) {
    //         treeSelect.map((item) => {
    //             const childs = arr.filter(
    //                 (m) => m.coQuanTrucThuocId === Number.parseInt(item.value, 10)
    //             );
    //             if (childs.length > 0) {
    //                 item.children = this.convertToTree(arr, item.capDonVi + 1, Number.parseInt(item.value, 10)).length < 1
    //                     ? null
    //                     : this.convertToTree(arr, item.capDonVi + 1, Number.parseInt(item.value, 10));
    //                 // set isLeaf = true;
    //                 if (this.isLoadCapDonVi && item.capDonVi === 1) {
    //                     item.isLeaf = true;
    //                 }

    //                 if (this.isDisabledParentNode) {
    //                     item.disabled = true;
    //                 }
    //             } else {
    //                 item.isLeaf = true;
    //             }
    //         });
    //     }

    //     return treeSelect;
    // }
}
