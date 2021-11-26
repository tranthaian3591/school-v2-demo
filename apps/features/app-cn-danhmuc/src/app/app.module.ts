/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { getAppConfigProvider, WebConfigModule } from '@school-v2/web-config';
import { environment } from '@school-v2/shared/environments';
// import { CustomTranslateService } from '@school-v2/shared/services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    //WebConfigModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
      },
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    //CustomTranslateService,
    //getAppConfigProvider(environment),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
