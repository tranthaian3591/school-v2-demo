import { AfterViewInit, Directive, OnDestroy } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[overlayWindow]'
})
export class OverlayWindowDirective implements OnDestroy, AfterViewInit {
    overlay: HTMLElement;
    private currentOverlayZindex: string;

    ngOnDestroy() {
        this.setOverlayzIndex();
    }

    ngAfterViewInit() {
       setTimeout(() => {
           this.startOverlay();
       }, 0);
    }

    private setOverlayzIndex() {
        if (this.overlay) {
            this.overlay.style.zIndex = this.currentOverlayZindex;
        }
    }

    private startOverlay() {
        this.overlay = document.querySelector('.k-overlay');
        const element = document.querySelector('kendo-window:last-child') as HTMLElement;
        const previousElement = element.previousElementSibling as HTMLElement;
        if (this.overlay) {
            this.overlay.style.zIndex = element.style.zIndex;
            this.currentOverlayZindex = previousElement.style.zIndex;
        }
    }
}
