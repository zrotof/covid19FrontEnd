import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isEnglishchecked : boolean = true;
  isFrenchChecked : boolean = false;
  constructor(private translate: TranslateService, public googleAnalytics : GoogleAnalyticsService   ) {
   
  }

  ngOnInit(): void {
    
  }


  chooseEnglish(){

    if(!this.isEnglishchecked){
      $( ".en" ).prop( "checked", true );
      $( ".fr" ).prop( "checked", false );

      this.isEnglishchecked = true;
      this.isFrenchChecked = false;
      this.translate.use('en');
    }
    else{
      $( ".en" ).prop( "checked", true );
    }



  }

  chooseFrench(){

    if(!this.isFrenchChecked){
      $( ".fr" ).prop( "checked", true );
      $( ".en" ).prop( "checked", false );

      this.isFrenchChecked = true;
      this.isEnglishchecked = false;
      this.translate.use('fr');
    }
    else{
      $( ".fr" ).prop( "checked", true );
    }

    this.googleAnalytics.eventEmitter("Choix_langue", "français","click")
    
  }




  onBurgerMenu(){

   var burger = $('.burger_menu');
    var ul = $('.header-menu');
    const links = $('.header-menu > li ').toArray();
 
    ul.toggleClass("burger_slide_in");
 

    burger.toggleClass("toggle");


    links.forEach((link, index) => {

      if(link.style.animation){
        link.style.animation='';
      }
      else{
        link.style.animation= `navLinkFade 0.5s ease forwards ${index/7 + 0.3}s`;
      }
    });

}

}
