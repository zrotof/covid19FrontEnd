import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from '../../../about-us/about-us.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';
@NgModule({
  
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (aboutHttpTranslateLoader),
        deps: [HttpClient]
      },
      isolate:false,
      extend:true
    }),
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