import { Component, OnInit } from '@angular/core';
import { Covid19Service }from './services/main-services/main-covid19.service';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import{ environment } from '../environments/environment';

declare let gtag : Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SSCovid19';

  constructor( private covidService : Covid19Service, public router: Router, private gtmService: GoogleTagManagerService){
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        gtag('config', environment.GOOGLE_ANALYTICS,
            {
              'page_path':event.urlAfterRedirects
            });

      }
    })
   }

ngOnInit(){

    this.router.events.forEach(item =>{
      if (item instanceof NavigationEnd){
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };
        this.gtmService.pushTag(gtmTag)
      }
    });
    {

    }

  }







}

 
  



