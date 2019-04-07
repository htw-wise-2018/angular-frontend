import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BuoysMapQuery } from '../../queries/buoys-map.query';

@Component({
  selector: 'app-button-nav',
  templateUrl: './button-nav.component.html',
  styleUrls: ['./button-nav.component.scss']
})
export class ButtonNavComponent implements OnInit {
  pathLayerVisibility$: Observable<boolean>;

  constructor(private buoysMapQuery: BuoysMapQuery) {
    this.pathLayerVisibility$ = this.buoysMapQuery.selectPathLayerVisibility$;
  }

  ngOnInit() {
  }

}
