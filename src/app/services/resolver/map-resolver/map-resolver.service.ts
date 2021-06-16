import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Covid19Service } from '../../main-services/main-covid19.service';


@Injectable({
  providedIn: 'root'
})
export class MapResolverService implements Resolve<any>{


  constructor(private covid19Service: Covid19Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    
    return forkJoin({
      allCountriesCases : this.covid19Service.getCountriesAllCases(),
      worldHistoricsData : this.covid19Service.getWorldHistoricsData(),
      worldVaccines : this.covid19Service.getWorldVaccines()
    })
  }
}

