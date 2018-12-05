import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { FloatDetails } from '../models/float-details.model';

export interface FloatDetailsState {
  floatDetails: FloatDetails;
  loading: boolean;
  error: any;
}

const initialState: FloatDetailsState = {
  floatDetails: null,
  loading: true,
  error: null
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'floatDetails' })
export class FloatDetailsStore extends Store<FloatDetailsState> {
  constructor() {
    super(initialState);
  }
}
