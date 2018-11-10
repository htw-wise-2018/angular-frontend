import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class MarkersLayerService extends LayerService {
  private onClickFn = null;
  private points = null;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    leafletService: LeafletService
  ) {
    super(leafletService, floatsMapQuery.selectMarkersLayerVisibility$);
  }

  onClick(onClickFn: (e, point, xy) => void) {
    this.onClickFn = onClickFn;
  }

  init() {
    combineLatest([
      this.floatsMapQuery.selectAll().pipe(
        map(floats => floats.map(float => {
          const point = [float.latitude, float.longitude];
          point['id'] = float.id;
          return point;
        }))
      ),
      this.visibility$
    ]).subscribe(([points, visibility]) => {
      this.points = points;

      if (this.layer) {
        this.hide();
      }

      if (visibility) {
        this.show();
      }
    });
  }

  protected show() {
    this.layer = L.glify.points({
      map: this.leafletService.getMap(),
      click: this.onClickFn,
      size: 10,
      // {Number} exagurates the size of the clickable area to make it easier to click a point
      sensitivity: 25,
      color: { r: 30 / 255, g: 202 / 255, b: 227 / 255 },
      opacity: 0.8,
      data: this.points,
      className: 'glify-canvas'
    });
  }

  protected hide() {
    this.layer.remove();
  }
}
