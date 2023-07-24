import { Component, OnInit } from '@angular/core';

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
  vaccinesNA : number = 0; 
  vaccinesSA : number= 0;
  vaccinesEU : number =0;
  vaccinesAS : number =0;
  vaccinesAF : number =0;
  vaccinesOC : number =0;

  dateWorld: number;
  constructor( 
    private covidService : Covid19Service,
    private title: Title, 
    private meta : Meta){}

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
      this.dateWorld= this.diff(this.world.wDate)
    })
  }


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
    .subscribe(result3 =>{
      this.countriesNA = result3
      this.countriesNA.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesNA = this.vaccinesNA + Number(element.cyVaccines)
        }
        
      });
    })
  }

  getContinentsSA() : void {
    this.covidService.getCountriesCasesByContinentSA()
    .subscribe(result4 =>{
      this.countriesSA = result4
      this.countriesSA.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesSA = this.vaccinesNA + Number(element.cyVaccines)
        }
        
      });
    })
  }

  getContinentsEU() : void {
    this.covidService.getCountriesCasesByContinentEU()
    .subscribe(result5 =>{
      this.countriesEU = result5;
      this.countriesEU.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesEU = this.vaccinesEU + Number(element.cyVaccines)
        }
        
      });
    })
  }

  getContinentsAS() : void {
    this.covidService.getCountriesCasesByContinentAS()
    .subscribe(result6 =>{
      this.countriesAS = result6;
      this.countriesAS.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesAS = this.vaccinesAS + Number(element.cyVaccines)
        }
        
      });
    })
  }

  getContinentsAF() : void {
    this.covidService.getCountriesCasesByContinentAF()
    .subscribe(result7 =>{
      this.countriesAF = result7;
      this.countriesAF.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesAF = this.vaccinesAF + Number(element.cyVaccines)
        }
        
      });
    })
  }

  getContinentsOC() : void {
    this.covidService.getCountriesCasesByContinentOC()
    .subscribe(result8 =>{
      this.countriesOC = result8;
      this.countriesOC.forEach(element => {
        if(element.cyVaccines != null)
        {
          this.vaccinesOC = this.vaccinesOC + Number(element.cyVaccines)
        }
      });
    })
  }

  /*getCountriesAll() : void {
    this.covidService.getCountriesAllCases()
    .subscribe(result9 =>this.countriesAll = result9)
  }*/



  //Function to set title and meta description of page
  setTitleAndMetaDescription(){
    
      this.title.setTitle("Overview of the complete global evolution of covid-19");
      this.meta.updateTag({ name: 'description', content: "Follow easely the evolution of covid-19 around the world with intuitive graphs and tables." });
    
  }


  //function to return time in minutes from last updates
  diff(dateW: Date){

    var toDay = new Date();
    var diff = (toDay.getTime() - new Date(dateW).getTime())
    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    return diffMins;
  }
  
}
