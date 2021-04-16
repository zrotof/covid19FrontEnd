import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclaimersComponent } from '../../../disclaimers/disclaimers.component';

const routes: Routes = [
  {path:'', component: DisclaimersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisclaimersRoutingModule { }
