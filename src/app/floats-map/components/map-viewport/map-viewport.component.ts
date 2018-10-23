import {Component, NgModule, OnInit} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MapState } from '../../state/map.state';

@Component({
  selector: 'app-map-viewport',
  templateUrl: './map-viewport.component.html',
  styleUrls: ['./map-viewport.component.scss']
})
export class MapViewportComponent implements OnInit {
  @Select(MapState.saltinessLayer) saltinessLayer: Observable<boolean>;
  @Select(MapState.markersLayer) markersLayer: Observable<boolean>;

  constructor() {
  }

  ngOnInit() {
  }

}
