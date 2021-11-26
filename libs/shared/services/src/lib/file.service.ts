import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandlerService } from './handler-error.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { fromEvent, Observable, of } from 'rxjs';
import { FileExtensionEnum } from '@school-v2/constant';
import { ReportUtil } from '@school-v2/shared/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfigEnv } from '@school-v2/web-config';
// import { HrmUrlConstant } from '@school-v2/hrm-app/constants';
export enum ExportDMReportEnum {
    DM_BacLuong,
    DM_LoaiHopDong,
    DM_NhomHopDong,
    DM_NhomNgach,
    DM_NgachCongChuc,
    DM_NhomViTriViecLam,
    DM_ViTriViecLam,
    DM_ChucDanhKhoaHoc,
    DM_NgoaiNgu,
    DM_TrinhDoNgoaiNgu,
    DM_TrinhDoViTinh,
    DM_TrinhDoChinhTri,
    DM_TrinhDoVanHoa,
    DM_TrinhDoNhaNuoc,
    DM_TrinhDoChuyenMon,
    DM_DanhHieu,
    DM_KhenThuong,
    DM_KyLuat,
    DM_DG_DoiTuongDanhGia,
    DM_DG_DoiTuongThucHien,
    DM_DG_HinhThucTraLoi,
    DM_DG_XepLoaiKetQuaDanhGia,
    DM_QuocGia,
    DM_TinhThanh,
    DM_QuanHuyen,
    DM_PhuongXa,
    DM_KhoiCoQuan,
    DM_CoQuan,
    DM_DanToc,
    DM_TonGiao,
    DM_TinhTrangHonNhan,
    DM_QuanHeGiaDinh,
    DM_DoiTuongChinhSach,
    DM_LoaiNhanSu,
    DM_CapQuyetDinh,
    DM_ChucDanh,
    DM_ChucVuCongDoan,
    DM_ChucVuCuuChienBinh,
    DM_ChucVuDoan,
    DM_ChucVuDang,
    DM_LinhVuc,
    DM_Tapchi,
    DM_HoiNghi,
    DM_QuanHam,
    DM_LoaiThuongBinh,
    SYS_Email,
    SYS_MailContent,
    DM_TinhTrangSucKhoe,
    DM_HinhThucDaoTao,
    DM_ChucVu,
}

@Injectable({ providedIn: 'root' })
export class FileService {
    private config = AppConfigEnv.settings;
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private handlerService: HandlerService,
        private spinner: NgxSpinnerService
    ) {
        this.apiUrl = `${this.config.apiServer}/api/${this.config.version}/`;
    }

    /**
     * Downloads file
     * @returns
     * @param url
     * @param option
     */
    downloadFile(url: string, option : any) {
        return this.http
            .post(this.apiUrl + url, option, {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(catchError(this.handlerService.parseErrorBlob));
    }

    exportFile(url: string, option : any, prefixName: string, isCMD = false) {
        this.spinner.show();
        return this.http
            .post(this.apiUrl + url, option, {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(
                catchError(this.handlerService.parseErrorBlob),
                finalize(() => this.spinner.hide())
            )
            .subscribe(res => {
                const contentDisposition = res.headers.get('content-disposition');
                this.convertResourceToBlob(
                    res.body,
                    FileExtensionEnum.DOCX,
                    `${prefixName}_${ReportUtil.generateExtensionReport()}.${ReportUtil.getExtension(contentDisposition)}`
                );
            });
    }

    /**
     * Converts resource to blob
     * @param resource
     * @param fileType
     * @param fileName
     */
    convertResourceToBlob(resource : any, fileType: string, fileName: string) {
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
     * Export all file
     * @param url
     * @param option
     */
    export(url: string, option : any) {
        this.spinner.show();
        return this.http
            .post(url, option, {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(
                catchError(this.handlerService.parseErrorBlob),
                finalize(() => this.spinner.hide()),
                tap(res => {
                    const contentDisposition = res.headers.get('content-disposition');
                    this.convertResourceToBlob(
                        res.body,
                        '',
                        ReportUtil.getFileNameReportFromContentDiposition(contentDisposition)
                    );
                })
            );
    }

    /**
     * Clones file
     * @param file
     * @returns file
     */
    cloneFile(file: File): Observable<File> {
        if (!(file && file instanceof File)) {
            return of(null) as any;
        }
        const reader = new FileReader();
        const stream$ = fromEvent(reader, 'loadend');
        reader.readAsArrayBuffer(file);
        return stream$.pipe(
            map(() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const blob = new Blob([reader.result!]);
                return new File([blob], file.name, {
                    lastModified: file.lastModified,
                });
            })
        );
    }

    /**
     * Export mac dinh
     * @param type
     * @param url
     * @param option
     */
    exportDefault(type: ExportDMReportEnum, url: string, option : any) {
        // this.spinner.show();
        // return this.http
        //     .post(this.apiUrl + HrmUrlConstant.API.QLNS_SYS_BIEU_MAU_CHI_TIET + '/Export', {
        //         maControlBieuMau: ExportDMReportEnum[type],
        //         url: `${this.config.apiServer}/api/${this.config.version}/${url}`,
        //         param: option
        //     }, {
        //         observe: 'response',
        //         responseType: 'blob',
        //     })
        //     .pipe(
        //         catchError(this.handlerService.parseErrorBlob),
        //         finalize(() => this.spinner.hide()),
        //         tap(res => {
        //             const contentDisposition = res.headers.get('content-disposition');
        //             this.convertResourceToBlob(
        //                 res.body,
        //                 '',
        //                 ReportUtil.getFileNameReportFromContentDiposition(contentDisposition)
        //             );
        //         })
        //     );
    }
}
