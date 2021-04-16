import { Component, OnInit } from '@angular/core';
import { Covid19Service }from './services/main-services/main-covid19.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SSCovid19';

  constructor( private covidService : Covid19Service){ }

ngOnInit(){

    

  }







}

 
  



