import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlifyMarkersLayerService extends LayerService {
  private onClickFn = null;
  private onNoPointClickFn = null;
  private points = null;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    leafletService: LeafletService,
  ) {
    super(leafletService, floatsMapQuery.selectMarkersLayerVisibility$);
  }

  onClick(onClickFn: (e, point, xy) => void) {
    this.onClickFn = onClickFn;
  }

  onNoPointClick(onNoPointClickFn: () => void) {
    this.onNoPointClickFn = onNoPointClickFn;
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

  show() {
    const wholeWorld = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [
                  -175,
                  -85
                ],
                [
                  175,
                  -85
                ],
                [
                  175,
                  85
                ],
                [
                  -175,
                  85
                ],
                [
                  -175,
                  -85
                ]
              ]
            ]
          }
        }
      ]
    };

    L.glify.shapes({
      map: this.leafletService.getMap(),
      data: wholeWorld,
      click: this.onNoPointClickFn,
      opacity: 0
    });

    this.layer = L.glify.points({
      map: this.leafletService.getMap(),
      click: this.onClickFn,
      size: 6,
      color: { r: 30 / 255, g: 202 / 255, b: 227 / 255 },
      opacity: 0.8,
      data: this.points,
      className: 'glify-canvas'
    });
  }

  hide() {
    this.layer.remove();
  }
}
