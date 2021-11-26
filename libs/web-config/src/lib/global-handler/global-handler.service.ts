import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IEnvironmentConfig } from '../environment';
import { SafeAny } from '../configs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(APP_CONFIG) private env: IEnvironmentConfig,
    ) {
    }

    handleError(error: SafeAny): void {
        if (!this.env.production) {
            console.error(error);
        }
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        if (chunkFailedMessage.test(error.message)) {
            window.location.reload();
        }
    }
}
