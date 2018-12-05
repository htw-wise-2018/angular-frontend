import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PathCoordinate } from '../models/path-coordinate.model';
import { PathState, PathStore } from '../store/path.store';

@Injectable({
  providedIn: 'root'
})
export class PathQuery extends QueryEntity<PathState, PathCoordinate> {
  constructor(protected pathStore: PathStore) {
    super(pathStore);
  }
}
