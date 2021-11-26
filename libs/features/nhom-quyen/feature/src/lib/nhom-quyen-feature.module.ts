import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NhomQuyenComponent } from './nhom-quyen/nhom-quyen.component';

const routes: Routes = [
  {
    path: '',
    component: NhomQuyenComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [NhomQuyenComponent],
})
export class NhomQuyenFeatureModule {}
