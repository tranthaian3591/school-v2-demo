import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { OnChangeType, OnTouchedType, SafeAny } from '@school-v2/shared/utils';
import { InputBoolean } from 'ng-zorro-antd/core/util';

export type AscFormControlType =
    | 'input'
    | 'number'
    | 'textarea'
    | 'date'
    | 'checkbox'
    | 'password'
    | 'ckeditor';
export type AscFormControlMode = 'vertical' | 'horizontal';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector       : 'asc-form-control',
    templateUrl    : './asc-form-control.component.html',
    styleUrls      : ['./asc-form-control.component.scss'],
    providers      : [
        {
            provide    : NG_VALUE_ACCESSOR,
            multi      : true,
            useExisting: forwardRef(() => AscFormControlComponent),
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AscFormControlComponent
    implements OnInit, OnChanges, ControlValueAccessor {
    inputValue!: string | number | boolean;
    
    @Input() label!: string;
    @Input() note!: string;
    @Input() value!: string | number | boolean;
    @Input() placeHolder = '';
    @Input() type: AscFormControlType = 'input';
    @Input() mode: AscFormControlMode = 'vertical';
    @Input() @InputBoolean() isDisabled = false;
    @Input() step = 1;
    @Input() max!: number;
    @Input() min = 0;
    @Input() rows = 3;
    @Input() disabledDate = null;
    
    @Input() editorConfig: SafeAny;
    
    
    leftCol!: string;
    rightCol!: string;
    
    // @Input() col: string; // 2-10 3-9
    @Input() set col(value: string) {
        if (value) {
            const array = value.split('-');
            if (array.length === 2) {
                this.leftCol = array[0];
                this.rightCol = array[1];
            }
        }
    };
    
    basePath = './assets/libs/ckeditor/ckeditor.js';
    
    constructor(private cdr: ChangeDetectorRef) {
    }
    
    ngOnChanges(changes: SimpleChanges) {
        const {
                  value,
                  disabledDate
              } = changes;
        if (value && value.currentValue) {
            this.setValue(value.currentValue);
        }
        
        if (disabledDate && disabledDate.currentValue) {
            this.cdr.detectChanges();
        }
        
    }
    
    ngOnInit() {
        this.setValue(this.value);
    }
    
    onChange: OnChangeType = () => {
        // code here
    };
    onTouched: OnTouchedType = () => {
        // code here
    };
    
    registerOnChange(fn: OnChangeType): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: OnTouchedType): void {
        this.onTouched = fn;
    }
    
    writeValue(value: string | number | boolean): void {
        this.inputValue = value;
        this.setValue(value);
        this.cdr.detectChanges();
    }
    
    setDisabledState(disabled: boolean): void {
        this.cdr.markForCheck();
    }
    
    onModelChange(value : any) {
        this.setValue(value.value);
        this.cdr.detectChanges();
    }
    
    setValue(value : any): void {
        this.inputValue = value;
        this.cdr.detectChanges();
        this.onChange(value);
    }
    
    dateTimePickerChange($event : any) {
        this.cdr.markForCheck();
    }
}
