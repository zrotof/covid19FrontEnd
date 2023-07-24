import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nTranslateService {

  translateLanguageEvent = new Subject<string>();
  constructor() { }

  changeLanguage(language: string){
    this.translateLanguageEvent.next(language);
  }
}
