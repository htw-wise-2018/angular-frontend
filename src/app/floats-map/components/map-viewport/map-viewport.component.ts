import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FloatsMapQuery } from '../../queries/floats-map.query';

@Component({
  selector: 'app-map-viewport',
  templateUrl: './map-viewport.component.html',
  styleUrls: ['./map-viewport.component.scss']
})
export class MapViewportComponent implements OnInit {
  saltinessLayerVisibility$: Observable<boolean>;
  markersLayerVisibility: Observable<boolean>;

  constructor(private floatMapsQuery: FloatsMapQuery) {
    this.markersLayerVisibility = this.floatMapsQuery.selectMarkersLayerVisibility$;
    this.saltinessLayerVisibility$ = this.floatMapsQuery.selectSaltinessLayerVisible$;
  }

  ngOnInit() {
  }

}
