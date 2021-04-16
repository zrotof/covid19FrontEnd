import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

	currentLang:string='';
	constructor(
		private translate: TranslateService
	  ) {
    
 
		
	  }

  ngOnInit(): void {
 /*
    this.translate.onLangChange.subscribe(lang=>{
      console.log(lang)
      this.translate.currentLang=''
      this.translate.use(lang.lang);
    })*/
  }

}
