import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


import { Covid19Service }from '../../services/main-services/main-covid19.service';
import { World } from '../../../../models/world';
import { Continent } from '../../../../models/continent';
import { Countries } from '../../../../models/countries';
import { Meta, Title } from '@angular/platform-browser';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-world-stats',
  templateUrl: './world-stats.component.html',
  styleUrls: ['./world-stats.component.css']
})
export class WorldStatsComponent implements OnInit {

  world : World;
  continents  :  Continent[];
  countriesNA : Countries[];
  countriesSA : Countries[];
  countriesEU : Countries[];
  countriesAS : Countries[];
  countriesAF : Countries[];
  countriesOC : Countries[];
  countriesAll : Countries[];


  //Test variables
  testsNA : number; 
  testsSA : number;
  testsEU : number;
  testsAS : number;
  testsAF : number;
  testsOC : number;

  //vacines variables
  vacinesNA : number; 
  vacinesSA : number;
  vacinesEU : number;
  vacinesAS : number;
  vacinesAF : number;
  vacinesOC : number;
  constructor( private translate : TranslateService, private covidService : Covid19Service,private title: Title, private meta : Meta){
    //private route: ActivatedRoute

    
    
    
     }

  ngOnInit(): void {

    this.setTitleAndMetaDescription();

    this.getWorld();
    this.getContinents();
    this.getContinentsNA();
    this.getContinentsSA();
    this.getContinentsEU();
    this.getContinentsAS();
    this.getContinentsAF();
    this.getContinentsOC();
    //this.getCountriesAll();

  }


/*
  getWorld() : World {

    let resolved = this.route.snapshot.data['resolved'];
    this.world = resolved.worldGlobals[0];

    return this.world ;

  }
*/




  getWorld() : void {

    this.covidService.getWorldGlobals()
    .subscribe(result => {
      this.world = result[0];
    })
  }

/*
  getContinents() : Continent[] {

    let resolved = this.route.snapshot.data['resolved'];
    this.continents = resolved.continentGlobals

    
      for(var i=0; i< Object.keys(this.continents).length; i++){
        if(this.continents[i].ctName == 'North America'){
          this.testsNA = this.continents[i].ctTests;
          //this.vacinesNA = this.continents[i].ctVaccines; 

        }
        else if(this.continents[i].ctName == 'South America'){
          this.testsSA = this.continents[i].ctTests;
          //this.vacinesSA  = this.continents[i].ctVaccines; 

        }
        else if(this.continents[i].ctName  == 'Europe'){
          this.testsEU = this.continents[i].ctTests;
          //this.vacinesEU  = this.continents[i].ctVaccines; 

        }
        else if(this.continents[i].ctName  == 'Asia'){
          this.testsAS = this.continents[i].ctTests;
          //this.vacinesAS  = this.continents[i].ctVaccines; 

        }
        else if(this.continents[i].ctName  == 'Africa'){
          this.testsAF = this.continents[i].ctTests;
          //this.vacinesAF  = this.continents[i].ctVaccines; 
        }
        else if(this.continents[i].ctName  == 'Oceania'){
          this.testsOC = this.continents[i].ctTests;
          //this.vacinesOC  = this.continents[i].ctVaccines; 
        }
      }

    return this.continents;
  }
*/


getContinents() : void {
  this.covidService.getContinentGlobals()
  .subscribe(result3 =>{
    this.continents = result3;
    for(var i=0; i< Object.keys(this.continents).length; i++){
      if(this.continents[i].ctName == 'North America'){
        this.testsNA = this.continents[i].ctTests;
        //this.vacinesNA = this.continents[i].ctVaccines; 

      }
      else if(this.continents[i].ctName == 'South America'){
        this.testsSA = this.continents[i].ctTests;
        //this.vacinesSA  = this.continents[i].ctVaccines; 

      }
      else if(this.continents[i].ctName  == 'Europe'){
        this.testsEU = this.continents[i].ctTests;
        //this.vacinesEU  = this.continents[i].ctVaccines; 

      }
      else if(this.continents[i].ctName  == 'Asia'){
        this.testsAS = this.continents[i].ctTests;
        //this.vacinesAS  = this.continents[i].ctVaccines; 

      }
      else if(this.continents[i].ctName  == 'Africa'){
        this.testsAF = this.continents[i].ctTests;
        //this.vacinesAF  = this.continents[i].ctVaccines; 
      }
      else if(this.continents[i].ctName  == 'Oceania'){
        this.testsOC = this.continents[i].ctTests;
        //this.vacinesOC  = this.continents[i].ctVaccines; 
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

  /*getCountriesAll() : void {
    this.covidService.getCountriesAllCases()
    .subscribe(result9 =>this.countriesAll = result9)
  }*/



  //Function to set title and meta description of page
  setTitleAndMetaDescription(){
    if( this.translate.currentLang == 'en'){
      this.title.setTitle("Overview of the complete global evolution of covid-19");
      this.meta.updateTag({ name: 'description', content: "SSCovid19 is a web application that allows you to easily follow the evolution of covid-19 around the world thanks to numerous intuitive graphs and tables." });
    }
    else{
      this.title.setTitle("Aperçu de l'évolution mondial complet du covid-19");
      this.meta.updateTag({ name: 'description', content: "SSCovid19 est une application web permettant de suivre facilement l'évolution du covid-19 dans le monde entier grâce à de nombreux graphiques et tableaux intuitifs." });
    }
  }


  //difference between the two dates in minutes
  diff(date: Date){

    var toDay = new Date();
    var diff = (toDay.getTime() - date.getTime())
    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    return diffMins;
  }
}
