import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRolesTreeComponent } from './select-roles-tree.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SelectRolesTreeComponent
    ],
    imports: [
        CommonModule,
        NzTreeSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SelectRolesTreeComponent
    ]
})
export class SelectRolesTreeModule {
}
