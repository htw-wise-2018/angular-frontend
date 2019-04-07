import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Buoy } from '../models/buoy.model';

export interface BuoysMapState extends EntityState<Buoy> {
  ui: {
    saltinessLayerVisibility: boolean;
    markersLayerVisibility: boolean;
    pathLayerVisibility: boolean;
    sidenavOpened: boolean;
  };
}

const initialState: BuoysMapState = {
  ui: {
    saltinessLayerVisibility: false,
    markersLayerVisibility: true,
    pathLayerVisibility: false,
    sidenavOpened: false
  }
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'buoysMap' })
export class BuoysMapStore extends EntityStore<BuoysMapState, Buoy> {
  constructor() {
    super(initialState);
  }

  updateSaltinessLayerVisibility(saltinessLayerVisibility: boolean) {
    this.update({
      ui: {
        ...this._value().ui,
        saltinessLayerVisibility
      }
    });
  }

  updateMarkersLayerVisibility(markersLayerVisibility: boolean) {
    this.update({
      ui: {
        ...this._value().ui,
        markersLayerVisibility
      }
    });
  }

  updatePathLayerVisibility(pathLayerVisibility: boolean) {
    this.update({
      ui: {
        ...this._value().ui,
        pathLayerVisibility
      }
    });
  }

  updateSidenavOpened(sidenavOpened: boolean) {
    this.update({
      ui: {
        ...this._value().ui,
        sidenavOpened
      }
    });
  }
}
