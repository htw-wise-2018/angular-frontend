import { Injectable } from '@angular/core';
import { delay, filter, map, take } from 'rxjs/operators';
import { FloatDetailsQuery } from '../../../queries/float-details.query';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class AntPathLayerService extends LayerService {
  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatDetailsQuery: FloatDetailsQuery,
    leafletService: LeafletService
  ) {
    super(leafletService, floatsMapQuery.selectPathLayerVisibility$);

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

    this.floatDetailsQuery.selectFloatDetails$.pipe(
      map(floatDetails => floatDetails.path),
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
    this.floatDetailsQuery.selectFloatDetails$.pipe(
      map(floatDetails => floatDetails.path),
      filter(pathCoordinates => pathCoordinates.length > 0),
      take(1),
      delay(1)
    ).subscribe(() => {
      const bounds = this.layer.getBounds();
      this.leafletService.getMap().fitBounds(bounds);
    });
  }
}
