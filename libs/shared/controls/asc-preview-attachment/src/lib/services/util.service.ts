import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AscPreviewAttachmentComponent } from '../asc-preview-attachment.component';
import { IPreviewModal } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor(private modal: NzModalService) {
    }

    onPreview(param: IPreviewModal) {
        this.modal.create({
            nzTitle: param.title,
            nzContent: AscPreviewAttachmentComponent,
            nzClassName: 'asc-preview',
            nzComponentParams: {
                ...param
            },
            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
            nzFooter: [],
        });
    }
}
