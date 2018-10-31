import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloatDetailsComponent } from './components/float-details/float-details.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';

const routes: Routes = [
  {
    path: '',
    component: MapViewportComponent,
    children: [
      {
        path: 'float/:id',
        component: FloatDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloatsMapRoutingModule {
}
