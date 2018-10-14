import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { ToggleMarkersLayer, ToggleSaltinessLayer } from '../../state/map.actions';

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
}
