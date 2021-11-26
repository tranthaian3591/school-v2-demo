import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'school-v2-asc-button',
    templateUrl: './asc-button.component.html',
    styleUrls: ['./asc-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AscButtonComponent implements OnInit {
    @Input() btnText!: string;
    @Input() btnIconSvg!: string;
    @Input() btnIconClass!: string;
    @Input() btnClass!: string;
    @Input() isDisabled = false;
    @Input() isSubmit = false;
    
    constructor() {
    }

    ngOnInit(): void {
    }
    
    @HostBinding('class')
    
    get hostClass(): string {
        return this.isDisabled ? 'disabled' : 'enabled';
    }

    haltDisabledEvents(event: MouseEvent): void {
        if (this.isDisabled && (event.target as HTMLElement)?.tagName === 'A') {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
    }
}
