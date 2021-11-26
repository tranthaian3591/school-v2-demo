import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@school-v2/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppMessageConfig } from '@school-v2/web-config';
import { AuthService, JwtUtil } from '@school-v2/auth/services';
import { MenuService } from '@school-v2/shared/state/menu';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { concatMap, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { UrlConstant } from '@school-v2/constant';
// import { SocketService, ThongBaoService } from '@school-v2/shared/socket';
import { ITokenInfo } from '@school-v2/auth/data-access';
import { forkJoin, Subject } from 'rxjs';

const exceptUrls = ['/', '/login'];
@Component({
  selector: 'app-school-v2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private signalRState = false;

  private destroyed$ = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private appConfig: AppMessageConfig,
    private auth: AuthService,
    private menuService: MenuService,
    private apiService: ApiService,
    // private thongBaoService: ThongBaoService,
    // private socketService: SocketService,
    private router: Router,
  ) {
    // config message
    this.appConfig.load();

    // config load lazy loading
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinner.show();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinner.hide();
      }
    });
  }

  ngOnInit() {
    forkJoin([
      this.auth.loadConfig(),
      //this.socketService.loadConfig(),
      //this.thongBaoService.loadConfig(),
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe();

    // this.socketService.isRefreshToken$.subscribe((isRefresh) => {
    //   if (isRefresh && !this.signalRState) {
    //     this.signalRState = true;
    //     if (this.auth.isAuthorized() && JwtUtil.isTokenExpired()) {
    //       this.refreshToken();
    //     }
    //   }
    // });

    const path = location.pathname;
    // check with access token
    if (this.auth.isAuthorized()) {
      if (JwtUtil.isTokenExpired()) {
        this.refreshToken();
      } else {
        // this.socketService.configureSignalR();
        if (exceptUrls.includes(path)) {
          this.router.navigate([UrlConstant.ROUTE.DASHBOARD]);
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private refreshToken() {
    // const menu$ = this.menuService.initMenu();
    // const thongBao$ = this.thongBaoService.getThongBaoManHinhs({
    //   pageNumber: 1,
    //   pageSize: 1000,
    // });
    // const requestBody = {
    //   refreshToken: JwtUtil.getRefreshToken(),
    // };
    // return this.apiService
    //   .post(
    //     UrlConstant.API.ACL_ACCOUNT + '/Refresh-Token',
    //     requestBody,
    //     false,
    //     2
    //   )
    //   .pipe(
    //     tap((res: ITokenInfo) => {
    //       if (res) {
    //         // set user token
    //         JwtUtil.setUserToken(res);
    //         // create connection signalR
    //         this.socketService.configureSignalR();
    //       }
    //     }),
    //     concatMap((res: ITokenInfo) => menu$.pipe(map((_) => res))),
    //     concatMap((res: ITokenInfo) => thongBao$.pipe(map((_) => res))),
    //     finalize(() => (this.signalRState = false)),
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((res) => {
    //     // set user token
    //     if (res) {
    //       if (exceptUrls.includes(location.pathname)) {
    //         this.router.navigate([UrlConstant.ROUTE.MODULE]);
    //       }
    //     } else {
    //       return this.router.navigateByUrl(UrlConstant.ROUTE.LOGIN);
    //     }
    //   });
  }
}
