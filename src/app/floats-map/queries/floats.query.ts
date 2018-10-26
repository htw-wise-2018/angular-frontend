import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Float } from '../models/float.model';
import { AddFloats } from '../state/floats.actions';
import { FloatsService } from '../services/floats.service';

@Injectable({
  providedIn: 'root'
})
export class FloatsQuery {

  constructor(
    private floatsService: FloatsService,
    private store: Store
  ) {
  }

  getFloats(): Observable<Float[]> {
    return this.floatsService.getFloats().pipe(
      tap(floats => {
        this.store.dispatch(new AddFloats(floats));
      })
    );
  }
}
