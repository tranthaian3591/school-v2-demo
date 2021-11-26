// import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
// import { Observable } from 'rxjs';
// import { JwtUtil } from '@school-v2/auth/services';
// import { UrlConstant } from '@school-v2/constant';

// @Injectable({ providedIn: 'root' })
// export class RequiredIsUserGuard implements CanLoad {
//     constructor(private router: Router) {}

//     canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
//         const user = JwtUtil.getUserInfo();
//         if (user.doiTuongId) {
//             return true;
//         }

//         return this.router.navigateByUrl(UrlConstant.ROUTE.LOGIN_NS);
//     }
// }
