import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldStatsComponent } from './world-stats/world-stats.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { BuyMaACoffeeComponent } from './buy-ma-acoffee/buy-ma-acoffee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

    { path: 'world-stats', component: WorldStatsComponent },
    { path: 'world-map', component: WorldMapComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'disclaimers', component: DisclaimersComponent },
    { path: 'buy-me-acoofee', component: BuyMaACoffeeComponent},
    { path: '',   redirectTo: '/world-stats', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
