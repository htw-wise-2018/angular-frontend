import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FloatsResponse } from '../interfaces/floats-response';
import { createFloat } from '../models/float.model';
import { FloatsMapStore } from '../store/floats-map.store';

@Injectable({
  providedIn: 'root'
})
export class FloatsMapService {
  constructor(
    private httpClient: HttpClient,
    private floatsStore: FloatsMapStore
  ) {

  }

  loadFloats() {
    this.floatsStore.setLoading(true);

    this.httpClient.get<FloatsResponse>('assets/last_seen.json').pipe(
      map(response => response.features),
      map(features => {
        return features.map(feature => createFloat({
          id: feature.properties.identifier,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1]
        }));
      })
    ).subscribe(floats => this.floatsStore.set(floats));
  }

  updateSaltinessLayerVisibility(saltinessLayerVisibility: boolean) {
    this.floatsStore.updateSaltinessLayerVisibility(saltinessLayerVisibility);
  }

  updateMarkersLayerVisibility(markersLayerVisibility: boolean) {
    this.floatsStore.updateMarkersLayerVisibility(markersLayerVisibility);
  }
}

