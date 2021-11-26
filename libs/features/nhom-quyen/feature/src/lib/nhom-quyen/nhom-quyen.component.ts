import { Component, Injector } from '@angular/core';
import { BaseListComponent } from '@school-v2/shared/base';
import { SafeAny } from '@school-v2/shared/utils';

@Component({
  selector: 'school-v2-nhom-quyen',
  templateUrl: './nhom-quyen.component.html',
  styleUrls: ['./nhom-quyen.component.scss'],
})
export class NhomQuyenComponent extends BaseListComponent<SafeAny> {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected showFormCreateOrUpdate() {
    throw new Error('Method not implemented.');
  }

  protected loadItems() {
    throw new Error('Method not implemented.');
  }

  reload() {
    this.loadItems();
  }
}
