import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { AppConfigEnv } from '@school-v2/web-config';
// import { NotificationService } from '@school-v2/shared/services';
import { NgxSpinnerService } from "ngx-spinner";
import { setTime } from "@progress/kendo-angular-dateinputs/dist/es2015/util";


const fileExts = ['mp4', 'mp3', 'rar'];
@Component({
    selector: 'view-file',
    templateUrl: './view-file.component.html',
    styleUrls: ['./view-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFileComponent implements OnInit, OnDestroy {
    @Input() key: string;
    @Input() fileName: string;
    @Input() isDownload: boolean;

    mediaUrl: SafeResourceUrl;
    downloadUrl: string;
    isMedia = true;
    media: string;

    // private config = AppConfigEnv.settings;

    constructor(
        // private notification: NotificationService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.spinner.show();
        }, 0);
        if (this.key) {
            const ext = this.fileName.split('.')[this.fileName.split('.').length - 1];
            if (fileExts.includes(ext)) {
                this.isMedia = false;
                return;
            }
            // this.media = `${this.config.resourceUrl}viewer.html?k=${this.key}`;
            // this.downloadUrl = `${this.config.resourceUrl}download.html?k=${this.key}`;
            // this.mediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media);
        } else {
            // this.notification.showErrorMessage('Không tìm thấy tập tin đính kèm !');
        }
    }

    ngOnDestroy() {
        this.spinner.hide();
    }

    downloadFile(){
        window.open(this.downloadUrl, '_blank');
    }

    loadContent() {
        this.spinner.hide();
    }
}