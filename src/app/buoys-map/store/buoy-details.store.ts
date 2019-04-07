import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { BuoyDetails } from '../models/buoy-details.model';

export interface BuoyDetailsState {
  buoyDetails: BuoyDetails;
  loading: boolean;
  error: any;
}

const initialState: BuoyDetailsState = {
  buoyDetails: {
    id: null,
    path: [],
    saltinessValues: [],
    temperatureValues: [],
    pressureValues: []
  },
  loading: true,
  error: null
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'buoyDetails' })
export class BuoyDetailsStore extends Store<BuoyDetailsState> {
  constructor() {
    super(initialState);
  }
}
