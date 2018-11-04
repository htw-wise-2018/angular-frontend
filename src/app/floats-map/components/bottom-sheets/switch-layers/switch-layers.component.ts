import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { FloatsMapQuery } from '../../../queries/floats-map.query';
import { FloatsMapService } from '../../../services/floats-map.service';

@Component({
  selector: 'app-switch-layers',
  templateUrl: './switch-layers.component.html',
  styleUrls: ['./switch-layers.component.scss']
})
export class SwitchLayersComponent implements OnInit {
  saltinessLayerVisibility$: Observable<boolean>;
  markersLayerVisibility$: Observable<boolean>;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService) {

    this.saltinessLayerVisibility$ = this.floatsMapQuery.selectSaltinessLayerVisibility$;
    this.markersLayerVisibility$ = this.floatsMapQuery.selectMarkersLayerVisibility$;
  }

  ngOnInit() {
  }

  onSaltinessLayerVisibilityChange(event: MatSlideToggleChange) {
    this.floatsMapService.updateSaltinessLayerVisibility(event.checked);
  }

  onMakersLayerVisibilityChange(event: MatSlideToggleChange) {
    this.floatsMapService.updateMarkersLayerVisibility(event.checked);
  }

}
