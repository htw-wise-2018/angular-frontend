import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {FloatsResponse} from '../interfaces/floats-response';
import {createFloat} from '../models/float.model';
import {FloatsMapStore} from '../store/floats-map.store';

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

    this.httpClient.get<FloatsResponse>(environment.endpoints.lastSeen).pipe(
      map(response => response.data),
      map(floats => floats.map(createFloat))
    ).subscribe(floats => this.floatsStore.set(floats));
  }

  updateSaltinessLayerVisibility(saltinessLayerVisibility: boolean) {
    this.floatsStore.updateSaltinessLayerVisibility(saltinessLayerVisibility);
  }

  updateMarkersLayerVisibility(markersLayerVisibility: boolean) {
    this.floatsStore.updateMarkersLayerVisibility(markersLayerVisibility);
  }

  updateAntPathLayerVisibility(antPathLayerVisibility: boolean) {
    this.floatsStore.updatePathLayerVisibility(antPathLayerVisibility);
  }

  updateSidenavOpened(sidenavOpened: boolean) {
    this.floatsStore.updateSidenavOpened(sidenavOpened);
  }
}

