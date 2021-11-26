import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDepartmentTreeComponent } from './select-department-tree.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SelectDepartmentTreeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTreeSelectModule
    ],
    exports: [
        SelectDepartmentTreeComponent
    ]
})
export class SelectDepartmentTreeModule {
}
