import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-ma-acoffee',
  templateUrl: './buy-ma-acoffee.component.html',
  styleUrls: ['./buy-ma-acoffee.component.css']
})
export class BuyMaACoffeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //Redirecting Buy me a coffee page 
  redirectToBMC(){

    const url = 'https://www.buymeacoffee.com/sscovid19';
    window.open(url, '_blank');
  }

}
