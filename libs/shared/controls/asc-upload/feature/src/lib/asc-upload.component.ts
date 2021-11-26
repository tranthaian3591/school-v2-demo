import {
    Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef
} from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CustomTranslateService } from '@school-v2/shared/services';
import { ViewFileComponent } from '@school-v2/shared/controls/view-file';
import { FOLDER } from '@school-v2/constant';
import { AppConfigEnv } from '@school-v2/web-config';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SafeAny } from '@school-v2/shared/utils';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'asc-upload',
    templateUrl: './asc-upload.component.html',
    styleUrls: ['./asc-upload.component.css'],
    providers: [
    ],
})
export class AscUploadComponent implements OnInit, OnChanges {
    @Input() file?: NzUploadFile[] = [];
    @Input() typeOfFile?: string;
    @Input() multiple = true;
    @Input() placeholder = 'Đính kèm';
    @Input() isDisabled = false;
    @Input() isDownload = false;
    @Input() isPublic = false;
    @Input() folderName?: string;
    @Input() fileSize?: number;
    @Input() stateWidth?: number;
    @Output() fileInput = new EventEmitter<SafeAny>();

    uploading = false;
    fileList: NzUploadFile[] = [];

    previewImage: string | undefined = '';
    previewVisible = false;

    config = AppConfigEnv.settings;

    uploadUrl = `${this.config.apiServer}/api/${this.config.version}/HRM/Medias/UploadFile`;

    protected translate: CustomTranslateService;
    protected modal: NzModalService;
    protected viewContainerRef: ViewContainerRef;
    protected isEnable = false;
    constructor(
        injector: Injector
    ) {
        this.translate = injector.get(CustomTranslateService);
        this.modal = injector.get(NzModalService);
        this.viewContainerRef = injector.get(ViewContainerRef);
    }

    ngOnInit() {
        const params = { 
            FolderFunction: this.folderName ?? FOLDER.FOLDER_FUNCTION,
            FileSize: 0,
        } as any;

        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');

        this.uploadUrl = `${this.uploadUrl}?${qs}`;
        if (this.isPublic) {
            this.uploadUrl = `${this.config.apiServer}/api/${this.config.version}/HRM/Medias/UploadFilePublic?${qs}`;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { file } = changes;
        if (file && file.currentValue && !this.isEnable) {
            this.isEnable = true;
            this.file = file.currentValue;
            if (this.file && this.file.length > 0) {
                this.fileList = [];
                this.fileList = this.fileList.concat(this.file);
                this.fileList.map((item, idx) => {
                    item.uid = idx.toString();
                });
            } else {
                this.fileList = [];
            }
        }
    }

    changeFile({ file, fileList }: NzUploadChangeParam) {
        const status = file.status;
        switch (status) {
            case 'done':
                if (this.multiple) {
                    if (fileList && fileList.length > 0) {
                        const fileOutput = this.fileList.map(item => {
                            if (item.response && item.response.result) {
                                return {
                                    fileId: item.response.result?.files[0].fileId,
                                    name: item.response.result?.files[0].name,
                                    type: 0,
                                    size: 0,
                                    path: item.response.result?.files[0].path,
                                    isDelete: false,
                                    guidId: item.response.result?.files[0].guidId,
                                };
                            } else {
                                return {
                                    fileId: item.fileDinhKemId,
                                    name: item.name,
                                    type: 0,
                                    size: 0,
                                    path: item.path,
                                    isDelete: false,
                                    guidId: item.guidId,
                                };
                            }
                        });
                        this.fileInput.emit(fileOutput);
                        return;
                    }
                } else {
                    if (fileList.length > 1) {
                        this.fileList.splice(0, 1);
                    }
                    const fileOutput = this.fileList.map(item => {
                        if (item.response && item.response.result) {
                            return {
                                fileId: item.response.result?.files[0].fileId,
                                name: item.response.result?.files[0].name,
                                type: 0,
                                size: 0,
                                path: item.response.result?.files[0].path,
                                isDelete: false,
                                guidId: item.response.result?.files[0].guidId,
                            };
                        } else {
                            return {
                                fileId: item.fileDinhKemId,
                                name: item.name,
                                type: 0,
                                size: 0,
                                path: item.path,
                                isDelete: false,
                                guidId: item.guidId,
                            };
                        }
                    });
                    this.fileInput.emit(fileOutput);
                }

                break;
            case 'removed':
                // eslint-disable-next-line no-case-declarations
                const output = this.fileList
                    .filter(m => m.uid !== file.uid)
                    .map(item => {
                        if (item.response && item.response.result) {
                            return {
                                fileId: item.response.result?.files[0].fileId,
                                name: item.response.result?.files[0].name,
                                type: 0,
                                size: 0,
                                path: item.response.result?.files[0].path,
                                guidId: item.response.result?.files[0].guidId,
                            };
                        } else {
                            return {
                                fileId: item.fileDinhKemId,
                                name: item.name,
                                type: 0,
                                size: 0,
                                path: item.path,
                                guidId: item.guidId,
                            };
                        }
                    });
                this.fileInput.emit(output);
                break;
        }
    }

    handlePreview = async (file: NzUploadFile) => {
        if (file && file.guidId) {
            this.modal.create({
                nzTitle: this.translate.get('LB.VIEW_FILE'),
                nzContent: ViewFileComponent,
                nzViewContainerRef: this.viewContainerRef,
                nzWidth: this.stateWidth ? this.stateWidth : 1100,
                nzWrapClassName: 'vertical-center-modal',
                nzComponentParams: {
                    key: file.guidId,
                    fileName: file.name,
                    isDownload: this.isDownload
                },
                nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
                nzFooter: null,
            });
        } else if (file && file.response && file.response.result && file.response.result.files && file.response.result.files.length > 0) {
            this.modal.create({
                nzTitle: this.translate.get('LB.VIEW_FILE'),
                nzContent: ViewFileComponent,
                nzViewContainerRef: this.viewContainerRef,
                nzWidth: this.stateWidth ? this.stateWidth : 1100,
                nzWrapClassName: 'vertical-center-modal',
                nzComponentParams: {
                    key: file.response.result.files[0].guidId,
                    fileName: file.response.result.files[0].name,
                    isDownload: this.isDownload
                },
                nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
                nzFooter: null,
            });
        }
    };

}
