import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ReportUtil, SafeAny } from '@school-v2/shared/utils'; 
import { FileService, HandlerService } from '@school-v2/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingBarService } from '@ngx-loading-bar/core';

export interface Upload {
    progress: number
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}

@Component({
    selector   : 'asc-nx-asc-preview-attachment',
    templateUrl: './asc-preview-attachment.component.html',
    styleUrls  : ['./asc-preview-attachment.component.scss']
})
export class AscPreviewAttachmentComponent implements OnInit, OnDestroy {
    @Input() data: SafeAny;
    @Input() url! : string;
    @Input() method = 'post';
    @Input() isDownload = true;
    imageUrls!: Array<string>;

    isLoading = false;
    loader = this.loaderBar.useRef();
    private destroyed$ = new Subject();

    constructor(
        private http: HttpClient,  
        private fileService: FileService,
        private handleService: HandlerService,
        private spinner: NgxSpinnerService,
        private loaderBar: LoadingBarService
    ) {
    }

    ngOnInit(): void {
        this.loadImage();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    loadImage() {
        switch (this.method) {
            case 'post':
                this.loader.start();
                this.http.post(this.url, {
                    ...this.data,
                    isPreview: true
                }).pipe(
                    map((res: SafeAny) => res.images),
                    finalize(() => this.loader.complete()),
                    takeUntil(this.destroyed$)
                ).subscribe(res => {
                    this.imageUrls = res;
                });
                break;
        }
    }

    download() {
        switch (this.method) {
            case 'post':
                this.spinner.show();
                this.http.post(this.url, this.data, {
                    observe     : 'response',
                    responseType: 'blob',
                }).pipe(
                    catchError(this.handleService.parseErrorBlob),
                    finalize(() => this.spinner.hide()),
                    takeUntil(this.destroyed$)
                ).subscribe(res => {
                    const contentDisposition = res.headers.get('content-disposition');
                    this.fileService.convertResourceToBlob(
                        res.body,
                        '',
                        ReportUtil.getFileNameReportFromContentDiposition(contentDisposition)
                    );
                });
                break;
        }
    }

    print() {
        // this.printerService.printAngular(this.PrintTemplateTpl);
    }

}

