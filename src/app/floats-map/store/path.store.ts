import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PathCoordinate } from '../models/path-coordinate.model';

export interface PathState extends EntityState<PathCoordinate> {}

const initialState: PathState = {};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'path' })
export class PathStore extends EntityStore<PathState, PathCoordinate> {
  constructor() {
    super(initialState);
  }
}
