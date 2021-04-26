import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})



export class AboutUsComponent implements OnInit {

	constructor(private translate: TranslateService, private title: Title, private meta : Meta) {


    if(this.translate.currentLang == 'en'){
      this.title.setTitle('SSCovid19 - About');
    }

    if(this.translate.currentLang == 'fr'){
      this.title.setTitle('SSCovid19 - À propos ');

    }

    
	}

  ngOnInit(): void {

  }



  

}
