import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Float } from '../models/float.model';
import { AddFloats } from '../state/floats.actions';
import { FloatsDataService } from './floats-data.service';

@Injectable({
  providedIn: 'root'
})
export class FloatsService {

  constructor(
    private floatsDataService: FloatsDataService,
    private store: Store
  ) {
  }

  getFloats(): Observable<Float[]> {
    return this.floatsDataService.getFloats().pipe(
      tap(floats => {
        this.store.dispatch(new AddFloats(floats));
      })
    );
  }
}
