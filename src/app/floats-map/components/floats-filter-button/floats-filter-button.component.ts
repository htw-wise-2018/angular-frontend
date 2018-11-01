import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';

@Component({
  selector: 'app-floats-filter-button',
  templateUrl: './floats-filter-button.component.html',
  styleUrls: ['./floats-filter-button.component.scss']
})
export class FloatsFilterButtonComponent implements OnInit {

  constructor(
    private dialogService: MatDialog,
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService
  ) {
  }

  ngOnInit() {
  }

  onToggleSaltinessLayerClick() {
    const visibility = this.floatsMapQuery.getSnapshot().ui.saltinessLayerVisibility;
    this.floatsMapService.updateSaltinessLayerVisibility(!visibility);
  }

  onToggleMarkersLayerClick() {
    const visibility = this.floatsMapQuery.getSnapshot().ui.markersLayerVisibility;
    this.floatsMapService.updateMarkersLayerVisibility(!visibility);
  }

  onOpenDialog() {
  }
}
