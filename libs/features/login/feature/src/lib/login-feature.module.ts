import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FieldErrorModule } from '@school-v2/shared/controls/field-error';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
})
export class LoginFeatureModule {}
