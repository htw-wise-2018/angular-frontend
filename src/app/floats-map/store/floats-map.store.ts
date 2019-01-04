import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Float } from '../models/float.model';

export interface FloatsMapState extends EntityState<Float> {
  ui: {
    saltinessLayerVisibility: boolean;
    markersLayerVisibility: boolean;
    pathLayerVisibility: boolean;
    sidenavOpened: boolean;
  };
}

const initialState: FloatsMapState = {
  ui: {
    saltinessLayerVisibility: true,
    markersLayerVisibility: true,
    pathLayerVisibility: false,
    sidenavOpened: false
  }
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'floatsMap' })
export class FloatsMapStore extends EntityStore<FloatsMapState, Float> {
  constructor() {
    super(initialState);
  }

  updateSaltinessLayerVisibility(saltinessLayerVisibility: boolean) {
    this.updateRoot({
      ui: {
        ...this._value().ui,
        saltinessLayerVisibility
      }
    });
  }

  updateMarkersLayerVisibility(markersLayerVisibility: boolean) {
    this.updateRoot({
      ui: {
        ...this._value().ui,
        markersLayerVisibility
      }
    });
  }

  updatePathLayerVisibility(pathLayerVisibility: boolean) {
    this.updateRoot({
      ui: {
        ...this._value().ui,
        pathLayerVisibility
      }
    });
  }

  updateSidenavOpened(sidenavOpened: boolean) {
    this.updateRoot({
      ui: {
        ...this._value().ui,
        sidenavOpened
      }
    });
  }
}
