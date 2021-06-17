import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorldStatsComponent } from './components/world-stats/world-stats.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { translateBrowserLoaderFactory } from './services/loaders/translate-browser.loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScreenSizeAdviceComponent } from './components/screen-size-advice/screen-size-advice.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WorldMapModule } from './modules/general/world-map/world-map.module';
import { DisclaimersModule } from './modules/general/disclaimers/disclaimers.module';
import { AboutUsModule } from './modules/general/about-us/about-us.module';
import { Covid19Module } from './modules/general/covid19/covid19.module';
import { BuyMeACoffeeModule } from './modules/general/buy-me-a-coffee/buy-me-a-coffee.module';

import { environment } from '../environments/environment.prod';


import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    WorldStatsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ScreenSizeAdviceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    NgbModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      },
      isolate:false
    }),
    WorldMapModule,
    DisclaimersModule,
    AboutUsModule,
    Covid19Module,
    BuyMeACoffeeModule

    

  ],
  providers: [
    Location,
    {provide: 'googleTagManagerId',  useValue: environment.GOOGLE_ANALYTICS},
    {provide: LocationStrategy, useClass: PathLocationStrategy},


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}