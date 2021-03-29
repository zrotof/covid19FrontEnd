import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorldStatsComponent } from './world-stats/world-stats.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { BuyMaACoffeeComponent } from './buy-ma-acoffee/buy-ma-acoffee.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Covid19Component } from './covid19/covid19.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScreenSizeAdviceComponent } from './screen-size-advice/screen-size-advice.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StartingLoaderComponent } from './starting-loader/starting-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldStatsComponent,
    WorldMapComponent,
    DisclaimersComponent,
    BuyMaACoffeeComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    Covid19Component,
    HeaderComponent,
    FooterComponent,
    ScreenSizeAdviceComponent,
    StartingLoaderComponent
  ],
  imports: [
    BrowserModule,
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
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}