import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { World } from '../../../../models/world';
import { Countries } from '../../../../models/countries';
import { Continent } from '../../../../models/continent';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  worldURL = environment.API_Covid_World ;

  continentURL = environment.API_Covid_Continents ;
  continentNA = environment.API_Covid_Countries_NA ;
  continentSA = environment.API_Covid_Countries_SA ;
  continentEU = environment.API_Covid_Countries_EU ;
  continentAS = environment.API_Covid_Countries_AS ;
  continentAF = environment.API_Covid_Countries_AF ;
  continentOC = environment.API_Covid_Countries_OC ;
  continentAll = environment.API_Covid_Countries_All ;
  allCountries = environment.API_Covid_JustCountries ;
  WorldHistoricAll = environment.API_World_Historical_All ;
  worldVaccines = environment.API_World_Vaccines;

  constructor( private http :HttpClient ){

  }

  getWorldGlobals(): Observable<World>{
   return this.http.get<World>(this.worldURL);
  }


  getContinentGlobals() : Observable<Continent[]>{

    return this.http.get<Continent[]>(this.continentURL)
  }

  getCountriesCasesByContinentNA() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentNA)
  }

  getCountriesCasesByContinentSA() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentSA)
  }

  getCountriesCasesByContinentEU() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentEU)
  }

  getCountriesCasesByContinentAS() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentAS)
  }

  getCountriesCasesByContinentAF() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentAF)
  }

  getCountriesCasesByContinentOC() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentOC)
  }

  //this function return all covid cases by countries
  //Its use to fetch the world map
   getCountriesAllCases() : Observable<any[]>{

    return this.http.get<Countries[]>(this.continentAll);
  }

  //all country list

  getCountriesAllCountries() : Observable<any>{

    return this.http.get<any>(this.allCountries);
  }

  ////////////Historical data world

  getWorldHistoricsData() : Observable<Object>{

    return this.http.get(this.WorldHistoricAll);
  }

  ////////////Historical data world

  getWorldVaccines() : Observable<Object>{

    return this.http.get(this.worldVaccines);
  }


  //Historical global data for a specific country
  getCountryHistoricalGlobalData(param) : any{

    return this.http.get("https://disease.sh/v3/covid-19/historical/"+param+"?lastdays=all");
  }

  //Historical vaccines data for a specific country
  getCountryHistoricalVaccinesData(param) : any{

    return this.http.get("https://disease.sh/v3/covid-19/vaccine/coverage/countries/"+param+"?lastdays=all&fullData=true");
  }


   ////////////Globals covid19 data for a specific country

   getCountryGlobals(param) : Observable<Countries[]>{

    return this.http.get<Countries[]>("https://disease.sh/v3/covid-19/countries/"+param+"?strict=true");
  }
}
