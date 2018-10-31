import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Float } from '../models/float.model';

export interface FloatsMapState extends EntityState<Float> {
  ui: {
    saltinessLayerVisibility: boolean;
    markersLayerVisibility: boolean;
    sidenavOpened: boolean
  };
}

const initialState: FloatsMapState = {
  ui: {
    saltinessLayerVisibility: true,
    markersLayerVisibility: true,
    sidenavOpened: false
  }
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'floats' })
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

  updateSidenavOpened(sidenavOpened: boolean) {
    this.updateRoot({
      ui: {
        ...this._value().ui,
        sidenavOpened
      }
    });
  }
}
