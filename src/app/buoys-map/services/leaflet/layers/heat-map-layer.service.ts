import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class HeatMapLayerService extends LayerService {
  constructor(
    private buoysMapQuery: BuoysMapQuery,
    leafletService: LeafletService
  ) {
    super(leafletService, buoysMapQuery.selectSaltinessLayerVisibility$);

    this.layer = new HeatmapOverlay({
      radius: 1.25,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'saltiness'
    });

    this.buoysMapQuery
      .selectAll()
      .pipe(
        map(buoys => ({ data: buoys.map(buoy => buoy.coordinates) }))
      )
      .subscribe(data => this.layer.setData(data));
  }
}
