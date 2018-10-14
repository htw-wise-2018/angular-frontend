import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MapViewportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloatsMapRoutingModule {
}
