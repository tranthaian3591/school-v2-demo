// import { AppConfigEnv } from '@asc-nx/web-config';
import { SafeAny } from './types';

export class ReportUtil {
    static convertResourceToBlob(resource: SafeAny, fileType: string, fileName: string) {
        const blob = new Blob([resource], {
            type: fileType,
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);

        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }

    /**
     * Generate
     * @returns {string}
     */
    static generateExtensionReport() {
        const m = new Date();
        return (
            m.getFullYear().toString() +
            (m.getMonth() + 1).toString().padStart(2, '0') +
            m.getDate().toString().padStart(2, '0') +
            m.getHours().toString().padStart(2, '0') +
            m.getMinutes().toString().padStart(2, '0') +
            m.getSeconds().toString().padStart(2, '0')
        );
    }

    static getExtension(contentDiposition: string) {
        const converToArray = contentDiposition.split('.');
        return `${converToArray[converToArray.length - 1]}`;
    }

    /**
     * Get File Name
     * @param contentDiposition
     */
    static getFileNameReportFromContentDiposition(contentDiposition: string) {
        // attachment; filename=HopDongLamViecXacDinhThoiHan.doc; filename*=UTF-8''HopDongLamViecXacDinhThoiHan.doc
        const secondElement = contentDiposition.split(';')[1];
        const fileName = secondElement.substr(10).split('.')[0];
        return `${fileName}_${ReportUtil.generateExtensionReport()}.${ReportUtil.getExtension(contentDiposition)}`;
    }

    static getReportHrmUrl(prefix: string) {
      //return `${AppConfigEnv.settings.apiServer}/api/v1/${prefix}`;
      return '';
    }
}
