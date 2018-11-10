import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { LeafletService } from './leaflet.service';

@Injectable({
  providedIn: 'root'
})
export class GlifyService {

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private leafletService: LeafletService
  ) {
  }

  init(onClick: (e, point, xy) => void) {
    this.floatsMapQuery
      .selectAll()
      .pipe(
        map(floats => floats.map(float => {
          const point = [float.latitude, float.longitude];
          point['id'] = float.id;
          return point;
        }))
      )
      .subscribe(points => {
        L.glify.points({
          map: this.leafletService.getMap(),
          click: onClick,
          size: 10,
          // {Number} exagurates the size of the clickable area to make it easier to click a point
          sensitivity: 25,
          color: { r: 30 / 255, g: 202 / 255, b: 227 / 255 },
          opacity: 0.8,
          data: points,
          className: 'glify-canvas'
        });
      });
  }
}
