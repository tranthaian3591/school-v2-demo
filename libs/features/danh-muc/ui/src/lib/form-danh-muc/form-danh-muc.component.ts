import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'school-v2-form-danh-muc',
  templateUrl: './form-danh-muc.component.html',
  styleUrls: ['./form-danh-muc.component.scss'],
})
export class FormDanhMucComponent implements OnInit {
  title = '';
  isVisible = false;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }
}
