import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

	constructor(private translate: TranslateService, private title: Title, private meta: Meta) {  
	}

  ngOnInit(): void {
    this.setTitleAndMetaDescription();
  }

   //Function to set title and meta description of page
   setTitleAndMetaDescription(){
    if( this.translate.currentLang == 'en'){
      this.title.setTitle("What is covid-19 ?");
      this.meta.updateTag({ name: 'description', content: "access a set of information related to covid-19. This page answers frequently asked questions from the World Health Organization (WHO)." });
    }
    else{
      this.title.setTitle("C'est quoi la Covid-19 ?" );
      this.meta.updateTag({ name: 'description', content: "Accédez à un ensemble d'informations relatifs à la covid-19. C'est page répond aux questions fréquemment posées dont les sources proviennent de l'Organisation Mondiale de la Santé (OMS)." });
    }
  }

}
