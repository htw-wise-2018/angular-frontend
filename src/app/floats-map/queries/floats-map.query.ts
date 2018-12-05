import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Float } from '../models/float.model';
import { FloatsMapState, FloatsMapStore } from '../store/floats-map.store';

@Injectable({
  providedIn: 'root'
})
export class FloatsMapQuery extends QueryEntity<FloatsMapState, Float> {
  selectMarkersLayerVisibility$ = this.select(state => state.ui.markersLayerVisibility);
  selectSaltinessLayerVisibility$ = this.select(state => state.ui.saltinessLayerVisibility);
  selectPathLayerVisibility$ = this.select(state => state.ui.pathLayerVisibility);
  selectSidenavOpened$ = this.select(state => state.ui.sidenavOpened);

  constructor(protected floatsStore: FloatsMapStore) {
    super(floatsStore);
  }
}
