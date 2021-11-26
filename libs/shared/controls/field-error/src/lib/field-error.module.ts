import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './field-error.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [
        FieldErrorComponent
    ],
    exports: [
        FieldErrorComponent
    ]
})
export class FieldErrorModule {
}
