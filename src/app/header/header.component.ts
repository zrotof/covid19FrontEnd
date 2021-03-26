import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isEnglishchecked : boolean = true;
  isFrenchChecked : boolean = false;
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

  }


  chooseEnglish(){

    if(!this.isEnglishchecked){
      $( ".en" ).prop( "checked", true );
      $( ".fr" ).prop( "checked", false );

      this.isEnglishchecked = true;
      this.isFrenchChecked = false;

      console.log("click english something");
      this.translate.use("en");

    }
    else{
      $( ".en" ).prop( "checked", true );
      console.log("click english nothing")

    }



  }

  chooseFrench(){

    if(!this.isFrenchChecked){
      $( ".fr" ).prop( "checked", true );
      $( ".en" ).prop( "checked", false );

      this.isFrenchChecked = true;
      this.isEnglishchecked = false;

      this.translate.use("fr");


      console.log("click french something")

    }
    else{
      $( ".fr" ).prop( "checked", true );
      console.log("click french nothing");


    }


    
  }




  onBurgerMenu(){

    var burger = $('.burger_menu');
    var ul = $('.header-menu');
    const links = $('.header-menu > li ').toArray();
    ul.toggleClass("burger_slide_in");
    //console.log(links);

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
