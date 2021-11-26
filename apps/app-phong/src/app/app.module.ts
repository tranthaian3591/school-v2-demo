import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from '@school-v2/shared/base';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAppConfigProvider, WebConfigModule } from '@school-v2/web-config';
import { environment } from '@school-v2/shared/environments';
import { CustomTranslateService } from '@school-v2/shared/services';
import { HttpInterceptorProviders } from '@school-v2/auth/utils/interceptors';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    WebConfigModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    getAppConfigProvider(environment),
    HttpInterceptorProviders,
    CustomTranslateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
