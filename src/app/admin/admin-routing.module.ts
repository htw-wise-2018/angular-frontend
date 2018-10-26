import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './components/dashbaord/dashbaord.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashbaordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
