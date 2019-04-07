import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { FilterBuoysComponent } from '../bottom-sheets/filter-buoys/filter-buoys.component';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }


  onClick() {
    this.bottomSheet.open(FilterBuoysComponent, { autoFocus: false });
  }
}
