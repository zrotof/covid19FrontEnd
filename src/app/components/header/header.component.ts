import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isEnglishchecked : boolean = true;
  isFrenchChecked : boolean = false;
  constructor(private translate: TranslateService, private gtmService: GoogleTagManagerService   ) {
   
  }

  ngOnInit(): void {
    
  }


  chooseEnglish(){

    let englishCheckbox = <HTMLInputElement>document.querySelector('.en');
    let frenchCheckbox = <HTMLInputElement>document.querySelector('.fr');

    if(!this.isEnglishchecked){

      englishCheckbox.checked = true;
      frenchCheckbox.checked = false;

      this.isEnglishchecked = true;
      this.isFrenchChecked = false;
      this.translate.use('en');
    }
    else{
      englishCheckbox.checked = true;
    }

    this.customEvent();


  }


  chooseFrench(){


    let englishCheckbox = <HTMLInputElement>document.querySelector('.en');
    let frenchCheckbox = <HTMLInputElement>document.querySelector('.fr');

    if(!this.isFrenchChecked){

      frenchCheckbox.checked = true;
      englishCheckbox.checked = false;

      this.isFrenchChecked = true;
      this.isEnglishchecked = false;
      this.translate.use('fr');
    }

    else{
      frenchCheckbox.checked = true;
    }


    this.customEvent();
    
  }


onBurgerMenu(){

  let burger = <HTMLElement>document.querySelector('.burger_menu');
  let navigation = <HTMLElement>document.querySelector('.menu-language');

  burger.classList.toggle('toggle')
  navigation.classList.toggle('burger_slide_in')

}

customEvent() {

  
  const gtmTag = {
    event: 'choose-french',
    data: 'french user',
  };
  this.gtmService.pushTag(gtmTag);
}

}
