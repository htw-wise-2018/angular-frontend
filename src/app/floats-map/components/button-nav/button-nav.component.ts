import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FloatsMapQuery } from '../../queries/floats-map.query';

@Component({
  selector: 'app-button-nav',
  templateUrl: './button-nav.component.html',
  styleUrls: ['./button-nav.component.scss']
})
export class ButtonNavComponent implements OnInit {
  pathLayerVisibility$: Observable<boolean>;

  constructor(private floatsMapQuery: FloatsMapQuery) {
    this.pathLayerVisibility$ = this.floatsMapQuery.selectPathLayerVisibility$;
  }

  ngOnInit() {
  }

}
