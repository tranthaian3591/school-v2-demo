import { Directive, ElementRef, Renderer2 } from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[required]'
})
export class ControlRequiredDirective {

    constructor(
        private controlDir: NgControl,
        private renderer: Renderer2,
        private el: ElementRef) {}

    get control() {
        return this.controlDir.control;
    }
}
