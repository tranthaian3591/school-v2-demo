import { InjectionToken, ValueProvider } from '@angular/core';
import { SafeAny } from '@school-v2/shared/utils';

export const APP_ROLE_OPTION = new InjectionToken<SafeAny>(
    'school-v2.config'
);

export const getRoleProvider = (
    value: SafeAny
): ValueProvider => ({
    provide: APP_ROLE_OPTION,
    useValue: value,
});
