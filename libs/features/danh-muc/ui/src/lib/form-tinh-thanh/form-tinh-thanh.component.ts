import { DanhMucService } from '@school-v2/features/danh-muc/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'school-v2-form-tinh-thanh',
  templateUrl: './form-tinh-thanh.component.html',
  styleUrls: ['./form-tinh-thanh.component.scss'],
})
export class FormChucVuComponent implements OnInit, OnDestroy {
  isLoading = false;
  // dropdownListEnum = HrmSelectEnum;
  form!: FormGroup;
  id = 0;

  constructor(
    protected ref: WindowRef,
    private danhMucService: DanhMucService,
    protected formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      maTinhThanh: '',
      tenTinhThanh: '',
    });
  }

  ngOnDestroy(): void {}

  onSubmit() {
    this.danhMucService
      .createTinhThanh(
        this.form.controls['maTinhThanh'].value,
        this.form.controls['tenTinhThanh'].value
      )
      .subscribe((data) => {
        if (data === true) {
          this.notification.success('Thông báo', 'Thành công');
          this.closeForm();
        }
      });
  }

  public closeForm(): void {
    this.ref.close();
  }
}
