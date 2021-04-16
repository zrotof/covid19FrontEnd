import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyMeACoffeeRoutingModule } from './buy-me-a-coffee-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BuyMaACoffeeComponent } from '../../../buy-ma-acoffee/buy-ma-acoffee.component';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';

@NgModule({

  imports: [
    CommonModule,
    BuyMeACoffeeRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: bmacHttpTranslateLoader,
        deps: [HttpClient]
      },
      isolate:false,
      extend:true
    }),
    SharedTranslateModule
  ],
  exports :[
    BuyMaACoffeeComponent
  ],
  declarations :[
    BuyMaACoffeeComponent
  ],
  providers: [
  ],
})
export class BuyMeACoffeeModule { }

export function bmacHttpTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/bmac/', '.json')
}