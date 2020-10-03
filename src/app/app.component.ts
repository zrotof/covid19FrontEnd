import { Component, OnInit } from '@angular/core';
import { Countries } from '../../models/countries';
import { Covid19Service }from './covid19.service';
import { FormControl } from '@angular/forms';

import { debounceTime, tap, switchMap, finalize, startWith,map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SSCovid19';
  

  searchCountry= new FormControl();
  filteredCountries : any;
  isLoading = false;
  errorMsg: string;

  constructor( private covidService : Covid19Service){ }

ngOnInit(){
  }
}

 
  



