import { Injectable } from '@angular/core';
import { AppConstant } from '@school-v2/constant';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class NotificationService {
    private option = {
        nzDuration: 3000,
        nzAnimate: true,
        nzTop: -100,
    };

    constructor(
        private toastr: ToastrService
    ) {
    }


    /**
     * Creates notification
     * @param title
     * @param content
     */
    createNotification(title: string, content: string): void {
        this.toastr.success(content, title, {
            enableHtml: true
        });
    }

    /**
     * Shows error message
     * @param mes
     */
    showSuccessMessage(mes: string): void {
        this.toastr.success(mes, AppConstant.TITLE, {
            enableHtml: true
        });
    }

    /**
     * Shows error message
     * @param mes
     */
    showErrorMessage(mes: string): void {
        this.toastr.error(mes, AppConstant.TITLE, {
            enableHtml: true
        });

    }

    showWarningMessage(mes: string) {
        this.toastr.warning(mes, AppConstant.TITLE, {
            enableHtml: true
        });
    }
}
