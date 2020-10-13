import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldStatsComponent } from './world-stats/world-stats.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { BuyMaACoffeeComponent } from './buy-ma-acoffee/buy-ma-acoffee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Covid19Component } from './covid19/covid19.component';
const routes: Routes = [

    { path: '', component: WorldStatsComponent },
    { path: 'map', component: WorldMapComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'covid19', component: Covid19Component },
    { path: 'disclaimers', component: DisclaimersComponent },
    { path: 'buy-me-a-coffee', component: BuyMaACoffeeComponent},
    { path: 'stats',   redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
