import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-disclaimers',
  templateUrl: './disclaimers.component.html',
  styleUrls: ['./disclaimers.component.css']
})
export class DisclaimersComponent implements OnInit {

  currentLang:string='';
	constructor(private translate: TranslateService) {
    
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
    })*/
  }

}
