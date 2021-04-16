import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nTranslateService {


  translateLanguageEvent = new Subject<string>();
  constructor(private translateService: TranslateService) { }

  changeLanguage(language: string){
    //this.translateService.use(language);
    this.translateLanguageEvent.next(language);

    console.log("modifié, les autres devraient écouter: "+ language)
  }
}
