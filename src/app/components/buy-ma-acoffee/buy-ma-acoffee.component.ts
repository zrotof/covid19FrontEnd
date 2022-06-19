import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-buy-ma-acoffee',
  templateUrl: './buy-ma-acoffee.component.html',
  styleUrls: ['./buy-ma-acoffee.component.css']
})
export class BuyMaACoffeeComponent implements OnInit {

	constructor() {
    
	  }

  ngOnInit(): void {

  }

  redirectToBmc(){

    const url = environment.API_BUY_ME_COFEE_URL_MY_PAGE;
    window.open(url, '_blank');
  }

  redirectToBmcAbout(){

    const url = environment.API_BUY_ME_COFEE_URL_ABOUT;
    window.open(url, '_blank');
  }


}
