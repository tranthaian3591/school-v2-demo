import { FormControl, FormGroup } from '@angular/forms';
import { SafeAny } from './types';

export function ValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if ((control && typeof control.value === 'string') || (control && control.value instanceof String)
        ) {
            control.setValue(control.value.trim());
        }

        if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            ValidateAllFormFields(control);
        }
    });
}

export function cleanForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.get(key);
        if (control && typeof control.value === 'string' || (control && control.value instanceof String)
        ) {
            control.setValue(control.value.trim());
        }
    });
}

export function assignValues(target: SafeAny, source: SafeAny): void {
    Object.assign(target, source);
}

export function clearValidateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.clearValidators();
            control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
            control.clearValidators();
        }
    });
    formGroup.updateValueAndValidity();
}
