import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Float } from '../../models/float.model';
import { FloatsMapQuery } from '../../queries/floats-map.query';

@Component({
  selector: 'app-float-details',
  templateUrl: './float-details.component.html',
  styleUrls: ['./float-details.component.scss']
})
export class FloatDetailsComponent implements OnInit {
  float$: Observable<Float>;
  data: object[];

  constructor(private floatsMapQuery: FloatsMapQuery) {
    this.float$ = this.floatsMapQuery.selectActive();

  }

  ngOnInit() {
    this.float$.subscribe(float => {
      this.data = [
        {
          name: 'Saltiness',
          series: _.chain(_.range(100)).map(i => ({ name: i, value: _.random(0, 1000) })).value()
        }
      ];
    });
  }
}
