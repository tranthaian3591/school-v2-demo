import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[overflowBody]'
})
export class OverflowBodyDirective implements OnInit, OnDestroy {
    ngOnInit() {
        document.body.classList.add('body_overflow', 'nicescroll-cl')
    }

    ngOnDestroy() {
        document.body.classList.remove('body_overflow', 'nicescroll-cl');
    }
}
