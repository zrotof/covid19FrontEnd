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


  openNetwork(param: string){

    let website; 
    if(param === 'linkedin'){
      website = "https://www.linkedin.com/in/bonachisamuel";

    }
    else if(param === 'instagram'){
      website = "https://www.instagram.com/zrotof_"

    }
    else if(param == 'github'){
      website = "https://github.com/zrotof"
    }

    else if(param == 'portfolio'){
      website =  "https://sm-digitalizer.fr/#accueil"
    }

    window.open(website, "_blank");

  }



  

}
