import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// import { ITreeGroupPermission } from '@school-v2/hrm-app/views/system/data-access';
// import { PermissionService } from '@school-v2/hrm-app/views/system/store';
import { OnChangeType, OnTouchedType, SafeAny } from '@school-v2/shared/utils';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'select-roles-tree',
    templateUrl: './select-roles-tree.component.html',
    styleUrls: ['./select-roles-tree.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectRolesTreeComponent),
        },
        // PermissionService,
    ],
})
export class SelectRolesTreeComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn';
    @Input() isMultiple = true;
    @Input() isDisabled = false;
    @Input() isDisabledParentNode = false;

    @Output() selected: string;
    value: SafeAny;

    treeGroupPermission: SafeAny[] = [];

    expandKeys = [];
    isLoading = false;

    private destroyed$ = new Subject();

    constructor(
        // private permissionService: PermissionService
        ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { userSelectedIds } = changes;
        if (userSelectedIds && userSelectedIds.currentValue.length === 0) {
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
    }

    onChange: OnChangeType = () => {
    };
    onTouched: OnTouchedType = () => {};


    ngOnInit(): void {
        this.loadTreeGroupPermission();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadTreeGroupPermission() {
        // this.permissionService
        //     .getGroupForTree(null, null)
        //     .pipe(map((res) => this.setTreeValue(res)))
        //     .pipe(takeUntil(this.destroyed$))
        //     .subscribe();
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            if (this.isMultiple) {
                this.value = res.map(x => x.idGroupPermission);
            }
            
            // this.treeGroupPermission = this.toTree(res, 0, -1);
            this.expandKeys = this.treeGroupPermission.map(
                (m) => m.idGroupPermission
            );
        }
    }

    // private toTree(
    //     arr: ITreeGroupPermission[],
    //     level: number,
    //     parentId: number
    // ): ITreeGroupPermission[] {
    //     const users = arr
    //         .filter(
    //             (m) =>
    //                 (level < 1 && m.level < 1) ||
    //                 (level > 0 && m.idParent > 0 && m.idParent === parentId)
    //         )
    //         .map((m) => {
    //             return {
    //                 ...m,
    //                 expanded: false,
    //                 children: [],
    //                 isLeaf: false,
    //                 title: m.groupName,
    //                 value: m.idGroupPermission.toString(),
    //             };
    //         });
    //     if (users.length > 0) {
    //         users.map((item) => {
    //             item.key = item.idGroupPermission;
    //             const childs = arr.filter(
    //                 (m) => m.idParent === item.idGroupPermission
    //             );
    //             if (childs.length > 0) {
    //                 item.children = this.toTree(
    //                     arr,
    //                     item.level + 1,
    //                     item.idGroupPermission
    //                 );
    //                 if (this.isDisabledParentNode) {
    //                     item.disabled = true;
    //                 }
    //             } else {
    //                 item.isLeaf = true;
    //             }
    //         });
    //     }

    //     return users;
    // }
}
