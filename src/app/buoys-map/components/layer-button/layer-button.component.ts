import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { SwitchLayersComponent } from '../bottom-sheets/switch-layers/switch-layers.component';

@Component({
  selector: 'app-layer-button',
  templateUrl: './layer-button.component.html',
  styleUrls: ['./layer-button.component.scss']
})
export class LayerButtonComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  onClick() {
    this.bottomSheet.open(SwitchLayersComponent, { autoFocus: false });
  }
}
