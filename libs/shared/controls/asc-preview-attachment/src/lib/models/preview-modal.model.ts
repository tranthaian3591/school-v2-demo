import { SafeAny } from '@asc-nx/shared/utils';

export interface IPreviewModal {
    title: string;
    data: SafeAny;
    url: string;
    isDownload?: boolean;
    method?: string;
}
