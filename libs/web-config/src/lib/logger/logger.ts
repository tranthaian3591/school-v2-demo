import { isDevMode } from '@angular/core';
import { environment } from '@school-v2/shared/environments';
import { SafeAny } from '../configs';

const record: Record<string, boolean> = {};

export const PREFIX = '[ASC]:';

function notRecorded(...args: SafeAny[]): boolean {
    const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

    if (record[asRecord]) {
        return false;
    } else {
        record[asRecord] = true;
        return true;
    }
}

function consoleCommonBehavior(
    consoleFunc: (...args: SafeAny) => void,
    ...args: SafeAny[]
): void {
    if (environment.production || (isDevMode() && notRecorded(...args))) {
        consoleFunc(...args);
    }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: SafeAny[]) =>
    consoleCommonBehavior(
        (...arg: SafeAny[]) => console.warn(PREFIX, ...arg),
        ...args
    );

export const warnDeprecation = (...args: SafeAny[]) => {
    if (!environment.production) {
        const stack = new Error().stack;
        return consoleCommonBehavior(
            (...arg: SafeAny[]) =>
                console.warn(PREFIX, 'deprecated:', ...arg, stack),
            ...args
        );
    } else {
        return () => {
            // code here
        };
    }
};

// Log should only be printed in dev mode.
export const log = (...args: SafeAny[]) => {
    if (isDevMode()) {
        console.log(PREFIX, ...args);
    }
};
