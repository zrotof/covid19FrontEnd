import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from '../../../components/about-us/about-us.component'
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';
@NgModule({
  
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedTranslateModule
  ],
  exports :[
    AboutUsComponent
  ],
  declarations :[
    AboutUsComponent
  ],
  providers: [],
})
export class AboutUsModule { }



export function aboutHttpTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/about/', '.json')
}