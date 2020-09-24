import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { World } from '../../models/world';
import { Countries } from '../../models/countries';
import { Continent } from '../../models/continent';
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
  WorldHistoricAll = environment.API_World_Historical_All ;

  constructor( private http :HttpClient ){

  }

  getWorldCases() : Observable<World>{

    return this.http.get<World>(this.worldURL);
  }

  getContinentCases() : Observable<Continent[]>{

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

  getCountriesAllCases() : Observable<Countries[]>{

    return this.http.get<Countries[]>(this.continentAll)
  }

  ////////////Historical data

  getWorldHistorical() : any{

    return this.http.get(this.WorldHistoricAll);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  */

}
