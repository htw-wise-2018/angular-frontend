import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloatDetailsComponent } from './components/float-details/float-details.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';
import { SidenavGuard } from './guards/sidenav.guard';

const routes: Routes = [
  {
    path: '',
    component: MapViewportComponent,
    children: [
      {
        path: 'float/:id/:mode',
        component: FloatDetailsComponent,
        canActivate: [SidenavGuard],
        canDeactivate: [SidenavGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloatsMapRoutingModule {
}
