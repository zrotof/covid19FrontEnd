import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyMaACoffeeComponent } from '../../../buy-ma-acoffee/buy-ma-acoffee.component';

const routes: Routes = [
  {path:'', component: BuyMaACoffeeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyMeACoffeeRoutingModule { }
