import { ThongTinNguoiDungComponent } from '@school-v2/features/thong-tin-nguoi-dung';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@school-v2/auth/services';
import { Observable, of } from 'rxjs';
import { SafeAny } from '@school-v2/shared/utils';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-school-v2-dashboard-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  isCollapsed = false;

  menus$: Observable<SafeAny[]>;
  sidebarWidth = '255px';

  private pageWidth = window.innerWidth;

  title = 'Danh mục';
  constructor(private authService: AuthService, private _drawerService: NzDrawerService,) {
    this.menus$ = of([
      {
        title: 'Hệ thống',
        css: 'setting',
        subMenu: [
          {
            title: 'Phân Quyền',
            link: 'phan-quyen',
          },
          {
            title: 'Nhóm Quyền',
            link: 'nhom-quyen',
          },
        ],
      },
      {
        title: 'Chức năng',
        css: 'file',
        subMenu: [
          {
            title: 'Danh sach truy cập',
            link: 'danh-sach-truy-cap',
          },
          {
            title: 'Danh mục',
            link: 'danh-muc',
          },
        ],
      },

    ]);

    this.isCollapsed = this.pageWidth < 640;
  }

  ngOnInit(): void {}

  trackByFunction(index: any, item: any) {
    return index;
  }

  doLogout() {
    this.authService.doLogout(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.pageWidth = event.target.innerWidth;
    this.isCollapsed = this.pageWidth < 640;
  }

  openPopupUserInfo() {
    this._drawerService.create({
      nzTitle: 'Thông tin người dùng',
      nzContent: ThongTinNguoiDungComponent,
      nzPlacement: 'right',
      nzClosable: true,
      nzMaskClosable: false,
      nzKeyboard: true,
      nzWidth: 700
    });
  }
}
