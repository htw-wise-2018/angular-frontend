import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { FloatDetailsComponent } from './components/float-details/float-details.component';
import { FloatsFilterButtonComponent } from './components/floats-filter-button/floats-filter-button.component';
import { MapFilterDialogComponent } from './components/floats-filter-dialog/map-filter-dialog.component';
import { HtwLogoComponent } from './components/htw-logo/htw-logo.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';
import { MapComponent } from './components/map/map.component';

import { FloatsMapRoutingModule } from './floats-map-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FloatsMapRoutingModule
  ],
  declarations: [
    MapFilterDialogComponent,
    MapViewportComponent,
    MapComponent,
    FloatsFilterButtonComponent,
    HtwLogoComponent,
    DetailsDialogComponent,
    FloatDetailsComponent
  ],
  entryComponents: [
    MapFilterDialogComponent,
    DetailsDialogComponent
  ]
})
export class FloatsMapModule {
}
