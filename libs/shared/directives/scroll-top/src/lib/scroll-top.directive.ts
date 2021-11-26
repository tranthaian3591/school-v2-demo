import { Directive, HostListener } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[scrollTop]',
})
export class DialogScrolltopDirective {
    @HostListener('click', ['$event']) onClick() {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20);
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 0);
    }
}
