import { Injectable } from '@angular/core';

declare let gtag: Function;


@Injectable({
  providedIn: 'any'
})


export class GoogleAnalyticsService {

  constructor() { }

  
  public eventEmitter(eventCategory: string, eventLabel: string = null, eventAction: string, eventValue: number= null ){
    gtag('event',{
      eventCategory: eventCategory, 
      eventLabel: eventLabel, 
      eventAction: eventAction, 
      eventValue: eventValue
                  
    })
  }
}
