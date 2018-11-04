import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { FilterFloatsComponent } from '../bottom-sheets/filter-floats/filter-floats.component';

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
    this.bottomSheet.open(FilterFloatsComponent, { autoFocus: false });
  }
}
