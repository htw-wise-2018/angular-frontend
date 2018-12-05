import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { PathResponse } from '../interfaces/path-response';
import { createPathCoordinate } from '../models/path-coordinate.model';
import { PathStore } from '../store/path.store';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  constructor(
    private httpClient: HttpClient,
    private pathStore: PathStore
  ) {

  }

  loadPath(floatId: ID) {
    this.pathStore.setLoading(true);

    this.httpClient.get<PathResponse>('assets/path.json').pipe(
      map(response => response.data),
      map(pathCoordinates => pathCoordinates.map(createPathCoordinate))
    ).subscribe(pathCoordinates => this.pathStore.set(pathCoordinates));
  }
}

