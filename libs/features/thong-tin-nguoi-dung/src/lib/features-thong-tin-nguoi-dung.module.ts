import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { ThongTinNguoiDungComponent } from './thong-tin-nguoi-dung.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AscFormControlModule } from '@school-v2/shared/controls/asc-form-control'; 
import { AscButtonModule } from '@school-v2/shared/controls/asc-button';
const routes: Routes = [
  {
    path: '',
    component: ThongTinNguoiDungComponent,
  },
];
@NgModule({
  imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AscFormControlModule,
            AscButtonModule
           ],
  declarations: [ThongTinNguoiDungComponent],
  exports: [ThongTinNguoiDungComponent],
})

export class FeaturesThongTinNguoiDungModule {}