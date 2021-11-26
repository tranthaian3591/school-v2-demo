import { Pipe, PipeTransform } from '@angular/core';
import { IconDictionary } from '@school-v2/constant';

@Pipe({name: 'schoolIcon'})
export class TranferIconPipe implements PipeTransform {
    transform(iconName: string): string | undefined {
        return IconDictionary.get(iconName);
    }
}
