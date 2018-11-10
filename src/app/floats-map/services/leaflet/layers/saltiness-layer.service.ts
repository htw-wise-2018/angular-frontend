import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { LayerService } from './layer.service';
import { LeafletService } from '../leaflet.service';

@Injectable({
  providedIn: 'root'
})
export class SaltinessLayerService extends LayerService {
  constructor(
    private floatsMapQuery: FloatsMapQuery,
    leafletService: LeafletService
  ) {
    super(leafletService, floatsMapQuery.selectSaltinessLayerVisibility$);

    this.layer = new HeatmapOverlay({
      radius: 1.25,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'saltiness'
    });

    this.floatsMapQuery
      .selectAll()
      .pipe(
        map(floats => ({ data: floats }))
      )
      .subscribe(data => this.layer.setData(data));
  }
}