import { Injectable } from '@angular/core';
import { delay, filter, map, take } from 'rxjs/operators';
import { BuoyDetailsQuery } from '../../../queries/buoy-details.query';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class AntPathLayerService extends LayerService {
  constructor(
    private buoysMapQuery: BuoysMapQuery,
    private buoyDetailsQuery: BuoyDetailsQuery,
    leafletService: LeafletService
  ) {
    super(leafletService, buoysMapQuery.selectPathLayerVisibility$);

    this.layer = L.polyline.antPath([], {
      'delay': 400,
      'dashArray': [10, 20],
      'weight': 5,
      'color': '#0000FF',
      'pulseColor': '#FFFFFF',
      'paused': false,
      'reverse': false
    });
  }

  init() {
    super.init();

    this.buoyDetailsQuery.selectBuoyDetails$.pipe(
      map(buoyDetails => buoyDetails.path),
      map(pathCoordinates => pathCoordinates.map(pathCoordinate => [pathCoordinate.latitude, pathCoordinate.longitude]))
    ).subscribe((pathCoordinates) => {
      this.layer.setLatLngs(pathCoordinates);
    });
  }


  hide() {
    super.hide();
  }

  show() {
    super.show();
    this.zoomIntoPathBounds();
  }

  zoomIntoPathBounds() {
    this.buoyDetailsQuery.selectBuoyDetails$.pipe(
      map(buoyDetails => buoyDetails.path),
      filter(pathCoordinates => pathCoordinates.length > 0),
      take(1),
      delay(1)
    ).subscribe(() => {
      const bounds = this.layer.getBounds();
      this.leafletService.getMap().fitBounds(bounds);
    });
  }
}
