import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@school-v2/auth/services';
import { UrlConstant } from '@school-v2/constant';
import { MenuService } from '@school-v2/shared/state/menu';
import { ValidateAllFormFields } from '@school-v2/shared/utils';
import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'school-v2-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  returnUrl = '';
  formLogin!: FormGroup;

  private destroyed$ = new Subject();

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    // private socketService: SocketService
  ) {
    this.formLogin = this.formBuilder.group({
      name: ['', Validators.required],
      pwd: ['', Validators.required],
      sessionCode: [''],
    });
  }

  ngOnInit(): void {
    this.auth.clearAll();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    this.router.navigate([this.returnUrl]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get f() {
    return this.formLogin.controls;
  }

  /**
   * Signins auth component
   */
  signin() {
    const currentSessionCode = this.auth.getCurrentSessionCode();
    if (this.formLogin.invalid) {
      ValidateAllFormFields(this.formLogin);
      return;
    }
    this.f.sessionCode.setValue(currentSessionCode);
    this.auth
      .doLogin(this.formLogin.value)
      .pipe(
        switchMap((isLogin) => {
          if (isLogin) {
            return this.menuService.initMenu().pipe(map((_) => isLogin));
          }
          return of(false);
        }),
        tap((isLogin) => {
          if (isLogin) {
            // tam thoi comment code (demo)
            // this.socketService.configureSignalR();
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((isLogin: boolean) => {
        if (isLogin) {
          this.router.navigate([UrlConstant.ROUTE.DASHBOARD]);
        }
      });
  }
}
