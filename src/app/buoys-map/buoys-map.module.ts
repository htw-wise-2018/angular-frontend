import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FilterBuoysComponent } from './components/bottom-sheets/filter-buoys/filter-buoys.component';
import { SwitchLayersComponent } from './components/bottom-sheets/switch-layers/switch-layers.component';
import { ButtonNavComponent } from './components/button-nav/button-nav.component';
import { ClosePathButtonComponent } from './components/close-path-button/close-path-button.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { BuoyDetailsComponent } from './components/buoy-details/buoy-details.component';
import { LayerButtonComponent } from './components/layer-button/layer-button.component';
import { MapViewportComponent } from './components/map-viewport/map-viewport.component';
import { MapComponent } from './components/map/map.component';

import { BuoysMapRoutingModule } from './buoys-map-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BuoysMapRoutingModule
  ],
  declarations: [
    MapViewportComponent,
    MapComponent,
    FilterButtonComponent,
    BuoyDetailsComponent,
    LayerButtonComponent,
    ButtonNavComponent,
    FilterBuoysComponent,
    SwitchLayersComponent,
    ClosePathButtonComponent
  ],
  entryComponents: [
    FilterBuoysComponent,
    SwitchLayersComponent
  ]
})
export class BuoysMapModule {
}
