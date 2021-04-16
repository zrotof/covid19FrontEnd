import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WorldStatsComponent } from './world-stats/world-stats.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DataResolverService} from './services/resolver/data-resolver/data-resolver.service';
import { MapResolverService } from './services/resolver/map-resolver/map-resolver.service';
const routes: Routes = [

    { path: '', 
      component: WorldStatsComponent,
      resolve:{
        resolved: DataResolverService
      } },
      
    { path: 'stats',   redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
    { path: 'maps',
      loadChildren:() => import ('./modules/general/world-map/world-map.module')
      .then(mod => mod.WorldMapModule),
      resolve: {
        resolved: MapResolverService
      } },
    { path: 'about',
      loadChildren:() => import ('./modules/general/about-us/about-us.module')
      .then(mod => mod.AboutUsModule)},
    { path: 'covid-19',
      loadChildren:() => import ('./modules/general/covid19/covid19.module')
      .then(mod => mod.Covid19Module)},
    { path: 'disclaimers',
      loadChildren:() => import ('./modules/general/disclaimers/disclaimers.module')
      .then(mod => mod.DisclaimersModule) },
    { path: 'buy-me-a-coffee',
      loadChildren:() => import ('./modules/general/buy-me-a-coffee/buy-me-a-coffee.module')
      .then(mod => mod.BuyMeACoffeeModule)},
      { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    {
      preloadingStrategy: PreloadAllModules
    }
    //,

    //{ relativeLinkResolution: 'legacy' }
  
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
