import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

 currentLang:string=''
	constructor(private translate: TranslateService) {
	}

  ngOnInit(): void {

	console.log(this.translate.currentLang);
	this.translate.use(this.translate.currentLang)
	


	/*

	this.translate.onLangChange.subscribe(lang=>{
		console.log(lang)
		this.translate.currentLang=''
		this.translate.use(lang.lang);
	})
	this.translate.currentLang =''


		const currentLang = this.translate.currentLang

		console.log(currentLang)

		
		this.translate.use(currentLang)
		if(currentLang === 'en'){
			this.translate.use(currentLang)
		}
		else
		{
			this.translate.use(currentLang)}
*/




  }



  

}
