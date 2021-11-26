import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditableFormDirective } from './content-editable-form.directive';

@NgModule({
    declarations: [ContentEditableFormDirective],
    imports: [CommonModule],
    exports: [ContentEditableFormDirective]
})
export class ContentEditableFormDirectiveModule { }
