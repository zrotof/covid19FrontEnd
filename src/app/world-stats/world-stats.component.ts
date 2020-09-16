import { Component, OnInit } from '@angular/core';

import { Covid19Service }from '../covid19.service';
import { World } from '../../../models/world';
import { Continent } from '../../../models/continent';
import { Countries } from '../../../models/countries';

@Component({
  selector: 'app-world-stats',
  templateUrl: './world-stats.component.html',
  styleUrls: ['./world-stats.component.css']
})
export class WorldStatsComponent implements OnInit {

  worlds : World;
  continents  :  Continent[];
  countriesNA : Countries[];
  countriesSA : Countries[];
  countriesEU : Countries[];
  countriesAS : Countries[];
  countriesAF : Countries[];
  countriesOC : Countries[];



  testsNA : number; 
  testsSA : number;
  testsEU : number;
  testsAS : number;
  testsAF : number;
  testsOC : number;
  constructor( private covidService : Covid19Service ) { }

  ngOnInit(): void {
    this.getWorld();
    this.getContinents();
    this.getContinentsNA();
    this.getContinentsSA();
    this.getContinentsEU();
    this.getContinentsAS();
    this.getContinentsAF();
    this.getContinentsOC();
  }

  getWorld() : void {
    this.covidService.getWorldCases()
    .subscribe(result1 => {
      this.worlds = result1;
    })
  }

  getContinents() : void {
    this.covidService.getContinentCases()
    .subscribe(result2 => {
      this.continents = result2;
      for(var i=0; i< Object.keys(this.continents).length; i++){
        if(this.continents[i].ctName == 'North America'){
          this.testsNA = this.continents[i].ctTests;
        }
        else if(this.continents[i].ctName == 'South America'){
          this.testsSA = this.continents[i].ctTests;
        }
        else if(this.continents[i].ctName  == 'Europe'){
          this.testsEU = this.continents[i].ctTests;
        }
        else if(this.continents[i].ctName  == 'Asia'){
          this.testsAS = this.continents[i].ctTests;
        }
        else if(this.continents[i].ctName  == 'Africa'){
          this.testsAF = this.continents[i].ctTests;
        }
        else if(this.continents[i].ctName  == 'Oceania'){
          this.testsOC = this.continents[i].ctTests;
        }
      }
    })
  }

  getContinentsNA() : void {
    this.covidService.getCountriesCasesByContinentNA()
    .subscribe(result3 =>this.countriesNA = result3)
  }

  getContinentsSA() : void {
    this.covidService.getCountriesCasesByContinentSA()
    .subscribe(result4 =>this.countriesSA = result4)
  }

  getContinentsEU() : void {
    this.covidService.getCountriesCasesByContinentEU()
    .subscribe(result5 =>this.countriesEU = result5)
  }

  getContinentsAS() : void {
    this.covidService.getCountriesCasesByContinentAS()
    .subscribe(result6 =>this.countriesAS = result6)
  }

  getContinentsAF() : void {
    this.covidService.getCountriesCasesByContinentAF()
    .subscribe(result7 =>this.countriesAF = result7)
  }

  getContinentsOC() : void {
    this.covidService.getCountriesCasesByContinentOC()
    .subscribe(result8 =>this.countriesOC = result8)
  }
}
