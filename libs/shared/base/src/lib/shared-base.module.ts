import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { KendoUIModule } from './kendo-ui.module';

import { TranslateModule } from '@ngx-translate/core';
import { TranferIconPipeModule } from '@school-v2/shared/pipes/tranfer-icon';
import { SafeHtmlPipeModule } from '@school-v2/shared/pipes/safe-html';

const LIBs = [
  TranslateModule,
  TranferIconPipeModule,
  SafeHtmlPipeModule,
  NgZorroAntdModule,
  KendoUIModule,
];

@NgModule({
  imports: [CommonModule, LIBs],
  exports: [LIBs]
})
export class SharedBaseModule {}
