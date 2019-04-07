import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Buoy } from '../models/buoy.model';
import { BuoysMapState, BuoysMapStore } from '../store/buoys-map.store';

@Injectable({
  providedIn: 'root'
})
export class BuoysMapQuery extends QueryEntity<BuoysMapState, Buoy> {
  selectMarkersLayerVisibility$ = this.select(state => state.ui.markersLayerVisibility);
  selectSaltinessLayerVisibility$ = this.select(state => state.ui.saltinessLayerVisibility);
  selectPathLayerVisibility$ = this.select(state => state.ui.pathLayerVisibility);
  selectSidenavOpened$ = this.select(state => state.ui.sidenavOpened);

  constructor(protected buoysMapStore: BuoysMapStore) {
    super(buoysMapStore);
  }
}
