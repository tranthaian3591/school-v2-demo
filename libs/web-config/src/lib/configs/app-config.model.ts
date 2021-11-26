export interface IAppConfig {
    env?: {
        name: string;
    };
    logging?: {
        console: boolean;
        appInsights: boolean;
    };
    menu?: {
        left: boolean;
        top: boolean;
    },
    logoUrl?: string;
    headerUrl?: string;
    resourceUrl?: string;
    apiServer?: string;
    uploadUrl?: string;
    notificationUrl?: string;
    sso?: string;
    version?: string;
    isLang?: boolean;
    fileSize?: number;
    exportDefault?: boolean;
}

export type SafeAny = any;
