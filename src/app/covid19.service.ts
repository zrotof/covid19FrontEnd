import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { World } from '../../models/world';
import { Countries } from '../../models/countries';
import { Continent } from '../../models/continent';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor( private http :HttpClient ) { }
}
