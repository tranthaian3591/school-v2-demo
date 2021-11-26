import { log } from './../../../../../web-config/src/lib/logger/logger';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'asc-nx-field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent implements OnInit { 
    @Input() control: FormControl;

    private errorMessages = {
        required: () => 'Vui lòng không được bỏ trống',
        minlength: (field) =>
            `Bắt buộc nhập tối thiểu ${field.requiredLength} kí tự`,
        maxlength: (field) =>
            `Bắt buộc nhập tối đa ${field.requiredLength} kí tự`,
        email: () => 'Định dạng Email không chính xác',
        invalidNumber: () => 'Bắt buộc phải nhập số',
        invalidSpace: () => 'Nội dung không được có khoảng trắng',
        invalidPhoneNumber: () => 'Định dạng số điện thoại không chính xác',
        mustMatch: () => 'Xác nhận mật khẩu không khớp',
    };

    constructor() {}

    ngOnInit(): void { 
    }

    /**
     * Should show errors
     * @returns true if show errors
     */
    shouldShowErrors(): boolean {
        return this.control && this.control.errors && this.control.touched;
    }

    /**
     * Lists of errors
     * @returns of errors
     */
    listOfErrors(): string[] {
        return Object.keys(this.control.errors).map((key) =>
            this.errorMessages[key](this.control.getError(key))
        );
    }
}
