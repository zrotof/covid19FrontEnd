import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldMapRoutingModule } from './world-map-routing.module';
import { WorldMapComponent } from '../../../world-map/world-map.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedTranslateModule } from '../../shared/shared-translate/shared-translate.module';

@NgModule({
  imports: [
    CommonModule,
    WorldMapRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: mapHttpTranslateLoader,
        deps: [HttpClient]
      }
    ,
    isolate:false,
    extend:true
  }),
  SharedTranslateModule

  ],
  exports :[
    WorldMapComponent
  ],
  declarations :[
    WorldMapComponent
  ],
  providers: [
  ]
})
export class WorldMapModule { }


export function mapHttpTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/map/', '.json')
}