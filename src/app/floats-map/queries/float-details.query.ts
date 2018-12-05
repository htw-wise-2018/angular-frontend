import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { FloatDetails } from '../models/float-details.model';
import { FloatDetailsState, FloatDetailsStore } from '../store/float-details.store';

@Injectable({
  providedIn: 'root'
})
export class FloatDetailsQuery extends Query<FloatDetailsState> {
  selectFloatDetails$: Observable<FloatDetails>;

  constructor(protected floatDetailsStore: FloatDetailsStore) {
    super(floatDetailsStore);

    this.selectFloatDetails$ = this.select(state => state.floatDetails);
  }
}
