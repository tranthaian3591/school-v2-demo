import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'asc-icon',
    templateUrl: './asc-icon.component.html',
    styleUrls: ['./asc-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AscIconComponent {
    @Input() icon: string;
}
