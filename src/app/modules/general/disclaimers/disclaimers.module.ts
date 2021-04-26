import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclaimersRoutingModule } from './disclaimers-routing.module';
import { DisclaimersComponent } from '../../../components/disclaimers/disclaimers.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';


@NgModule({
  imports: [
    CommonModule,
    DisclaimersRoutingModule,
    SharedTranslateModule

  ],
  exports :[
    DisclaimersComponent
  ],
  declarations :[
    DisclaimersComponent
  ],
  providers: [
  ],
})
export class DisclaimersModule { }


export function disclaimersHttpTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/disclaimers/', '.json')
}