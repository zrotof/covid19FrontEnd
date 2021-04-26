import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Covid19RoutingModule } from './covid19-routing.module';
import { Covid19Component } from '../../../components/covid19/covid19.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';

@NgModule({
  imports: [
    CommonModule,
    Covid19RoutingModule,
    SharedTranslateModule
  ],
  exports :[
    Covid19Component
  ],
  declarations :[
    Covid19Component
  ],
  providers: [
  ],
})
export class Covid19Module { }


export function covid19HttpTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/covid19/', '.json')
}