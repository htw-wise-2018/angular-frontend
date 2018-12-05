import { Injectable } from '@angular/core';
import { delay, filter, map, take } from 'rxjs/operators';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { PathQuery } from '../../../queries/path.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class AntPathLayerService extends LayerService {
  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private pathQuery: PathQuery,
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

    this.pathQuery.selectAll().pipe(
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
    this.zoomIntoBounds();
  }

  zoomIntoBounds() {
    this.pathQuery.selectAll().pipe(
      filter(pathCoordinates => pathCoordinates.length > 0),
      take(1),
      delay(1)
    ).subscribe(() => {
      const bounds = this.layer.getBounds();
      this.leafletService.getMap().fitBounds(bounds);
    });
  }
}
