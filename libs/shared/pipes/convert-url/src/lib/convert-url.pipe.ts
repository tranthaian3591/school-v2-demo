import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigEnv } from '@asc-nx/web-config';

@Pipe({
    name: 'convertUrl',
})
export class ConvertUrlPipe implements PipeTransform {
    transform(url: string): string {
        return AppConfigEnv.settings.resourceUrl + url;
    }
}
