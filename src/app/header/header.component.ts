import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
