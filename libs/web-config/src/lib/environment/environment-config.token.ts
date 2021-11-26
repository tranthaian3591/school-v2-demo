import { InjectionToken, ValueProvider } from '@angular/core';
import { IEnvironmentConfig } from './environment.config';

export const APP_CONFIG = new InjectionToken<IEnvironmentConfig>(
    'school-v2.config'
);

export const getAppConfigProvider = (
    value: IEnvironmentConfig
): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value,
});
