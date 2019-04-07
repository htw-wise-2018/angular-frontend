import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { BuoysMapQuery } from '../../../queries/buoys-map.query';
import { BuoysMapService } from '../../../services/buoys-map.service';

@Component({
  selector: 'app-switch-layers',
  templateUrl: './switch-layers.component.html',
  styleUrls: ['./switch-layers.component.scss']
})
export class SwitchLayersComponent implements OnInit {
  saltinessLayerVisibility$: Observable<boolean>;
  markersLayerVisibility$: Observable<boolean>;

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    private buoysMapService: BuoysMapService) {

    this.saltinessLayerVisibility$ = this.buoysMapQuery.selectSaltinessLayerVisibility$;
    this.markersLayerVisibility$ = this.buoysMapQuery.selectMarkersLayerVisibility$;
  }

  ngOnInit() {
  }

  onSaltinessLayerVisibilityChange(event: MatSlideToggleChange) {
    this.buoysMapService.updateSaltinessLayerVisibility(event.checked);
  }

  onMakersLayerVisibilityChange(event: MatSlideToggleChange) {
    this.buoysMapService.updateMarkersLayerVisibility(event.checked);
  }

}
