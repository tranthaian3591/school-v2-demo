import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUserLazyComponent } from './select-user-lazy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { HrmSelectModule } from '@school-v2/hrm-app/shared/controls/hrm-select/feature';
// import { TranslateModule } from '@ngx-translate/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ModalListUserComponent } from './modal-list-user/modal-list-user.component';
import { AscIconModule } from '@school-v2/shared/controls/asc-icon';
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
// import { OverflowBodyModule } from '@school-v2/shared/directives/overflow-body';


@NgModule({
    declarations: [
        SelectUserLazyComponent,
        // ModalListUserComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TreeViewModule,
        GridModule,
        DialogsModule,
        LayoutModule,
        NzSelectModule,
        NzSpinModule,
        NzEmptyModule,
        // HrmSelectModule,
        AscButtonModule,
        AscIconModule
        // OverflowBodyModule,
        // TranslateModule.forChild()
    ],
    exports     : [
        SelectUserLazyComponent
    ]
})
export class SelectUserLazyModule {
}
