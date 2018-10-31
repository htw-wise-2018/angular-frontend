import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

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
    this.dialogService.open(DetailsDialogComponent, {
      hasBackdrop: false,
      maxHeight: 300,
      position: {
        left: '1rem',
        top: '1rem'
      }
    });
  }
}
