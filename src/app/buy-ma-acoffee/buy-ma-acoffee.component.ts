import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-buy-ma-acoffee',
  templateUrl: './buy-ma-acoffee.component.html',
  styleUrls: ['./buy-ma-acoffee.component.css']
})
export class BuyMaACoffeeComponent implements OnInit {

  currentLang:string='';
	constructor(
		private translate: TranslateService
	  ) {
    
          
		this.currentLang=this.translate.currentLang
		this.translate.currentLang=''
		this.translate.use(this.currentLang);
		
		
	  }

  ngOnInit(): void {
 /*

    this.translate.onLangChange.subscribe(lang=>{
      console.log(lang)
      this.translate.currentLang=''
      this.translate.use(lang.lang);
    })
    */
  }

  /*setLangage(){
    console.log("this.translate.currentLang");

    console.log(this.translate.currentLang);
    if(!this.translate.currentLang ){
      this.translate.use('en');
      this.i18nTranslateService.changeLanguage('en');
      console.log("dans le 1")
    }else{
      this.i18nTranslateService.translateLanguageEvent.subscribe(language => {
        this.translate.use(language);
      console.log("lzlz");
    console.log(language)})

    console.log("dans le 2")
    console.log("this.translate.currentLang");
    console.log(this.translate.currentLang);

    this.i18nTranslateService.changeLanguage('en')
   // this.translate.use()
    console.log("changé")

    }
  }*/

  //Redirecting Buy me a coffee page 
  redirectToBmc(){

    const url = environment.API_BUY_ME_COFEE_URL_MY_PAGE;
    window.open(url, '_blank');
  }

  redirectToBmcAbout(){

    const url = environment.API_BUY_ME_COFEE_URL_ABOUT;
    window.open(url, '_blank');
  }


}
