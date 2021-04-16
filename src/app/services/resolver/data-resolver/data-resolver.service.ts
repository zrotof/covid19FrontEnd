import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Covid19Service } from '../../main-services/main-covid19.service';


@Injectable({
  providedIn: 'root'
})

//Resolver qui permettra de charger la page data
export class DataResolverService implements Resolve<any>{


  constructor(private http :HttpClient, private covid19Service: Covid19Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    return forkJoin({
      worldGlobals: this.covid19Service.getWorldGlobals(),
      continentGlobals: this.covid19Service.getContinentGlobals(),
      continentNA: this.covid19Service.getCountriesCasesByContinentNA(),
      continentSA: this.covid19Service.getCountriesCasesByContinentSA(),
      continentEU: this.covid19Service.getCountriesCasesByContinentEU(),
      continentAS: this.covid19Service.getCountriesCasesByContinentAS(),
      continentAF: this.covid19Service.getCountriesCasesByContinentAF(),
      continentOC: this.covid19Service.getCountriesCasesByContinentOC(),
    })
  }
}
