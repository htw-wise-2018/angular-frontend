import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter-dialog.component.html',
  styleUrls: ['./map-filter-dialog.component.scss']
})
export class MapFilterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MapFilterDialogComponent>) {
  }

  ngOnInit() {
  }

}
