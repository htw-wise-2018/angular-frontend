import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { BuoyDetails } from '../models/buoy-details.model';
import { BuoyDetailsState, BuoyDetailsStore } from '../store/buoy-details.store';

@Injectable({
  providedIn: 'root'
})
export class BuoyDetailsQuery extends Query<BuoyDetailsState> {
  selectBuoyDetails$: Observable<BuoyDetails>;

  constructor(protected buoyDetailsStore: BuoyDetailsStore) {
    super(buoyDetailsStore);

    this.selectBuoyDetails$ = this.select(state => state.buoyDetails);
  }
}
