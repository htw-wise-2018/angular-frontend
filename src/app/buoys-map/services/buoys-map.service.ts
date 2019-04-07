import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {BuoysResponse} from '../interfaces/buoys-response';
import {createBuoy} from '../models/buoy.model';
import {BuoysMapStore} from '../store/buoys-map.store';

@Injectable({
  providedIn: 'root'
})
export class BuoysMapService {
  constructor(
    private httpClient: HttpClient,
    private buoysMapStore: BuoysMapStore
  ) {

  }

  loadBuoys() {
    this.buoysMapStore.setLoading(true);

    this.httpClient.get<BuoysResponse>(environment.endpoints.lastSeen).pipe(
      map(response => response.data),
      map(buoys => buoys.map(createBuoy))
    ).subscribe(buoys => this.buoysMapStore.set(buoys));
  }

  updateSaltinessLayerVisibility(saltinessLayerVisibility: boolean) {
    this.buoysMapStore.updateSaltinessLayerVisibility(saltinessLayerVisibility);
  }

  updateMarkersLayerVisibility(markersLayerVisibility: boolean) {
    this.buoysMapStore.updateMarkersLayerVisibility(markersLayerVisibility);
  }

  updateAntPathLayerVisibility(antPathLayerVisibility: boolean) {
    this.buoysMapStore.updatePathLayerVisibility(antPathLayerVisibility);
  }

  updateSidenavOpened(sidenavOpened: boolean) {
    this.buoysMapStore.updateSidenavOpened(sidenavOpened);
  }
}

