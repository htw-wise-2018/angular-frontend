import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { ToggleMarkersLayer, ToggleSaltinessLayer } from '../../state/map.actions';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-floats-filter-button',
  templateUrl: './floats-filter-button.component.html',
  styleUrls: ['./floats-filter-button.component.scss']
})
export class FloatsFilterButtonComponent implements OnInit {

  constructor(
    private dialogService: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit() {
  }

  onToggleSaltinessLayerClick() {
    this.store.dispatch(new ToggleSaltinessLayer());
  }

  onToggleMarkersLayerClick() {
    this.store.dispatch(new ToggleMarkersLayer());
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
