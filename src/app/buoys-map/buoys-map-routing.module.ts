import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';
import { SidenavGuard } from './guards/sidenav.guard';

const routes: Routes = [
  {
    path: '',
    component: MapViewportComponent,
    children: [
      {
        path: 'buoy/:id/:mode',
        component: BuoyDetailsComponent,
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
export class BuoysMapRoutingModule {
}
