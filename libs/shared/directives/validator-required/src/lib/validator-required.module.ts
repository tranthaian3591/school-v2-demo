import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorsDirective } from './control-errors.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlRequiredDirective } from './control-required.directive';
import { ControlErrorModule } from './control-error/control-error.module';

const AllDirective = [
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlRequiredDirective
];

@NgModule({
    declarations: [AllDirective],
    imports: [CommonModule, ControlErrorModule],
    exports: [AllDirective]
})
export class ValidatorRequiredDirectiveModule { }
