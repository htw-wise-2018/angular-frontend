import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { FloatsFilterButtonComponent } from './components/floats-filter-button/floats-filter-button.component';
import { MapFilterDialogComponent } from './components/floats-filter-dialog/map-filter-dialog.component';
import { HtwLogoComponent } from './components/htw-logo/htw-logo.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';
import { MapComponent } from './components/map/map.component';

import { FloatsMapRoutingModule } from './floats-map-routing.module';
import { FloatsState } from './state/floats.state';
import { MapState } from './state/map.state';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    FloatsMapRoutingModule,
    NgxsModule.forFeature([FloatsState, MapState])
  ],
  declarations: [
    MapFilterDialogComponent,
    MapViewportComponent,
    MapComponent,
    FloatsFilterButtonComponent,
    HtwLogoComponent,
    DetailsDialogComponent
  ],
  entryComponents: [
    MapFilterDialogComponent,
    DetailsDialogComponent
  ]
})
export class FloatsMapModule {
}
