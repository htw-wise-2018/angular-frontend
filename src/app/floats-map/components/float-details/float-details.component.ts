import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { LineChartComponent } from '@swimlane/ngx-charts';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Float } from '../../models/float.model';
import { FloatsMapQuery } from '../../queries/floats-map.query';

@Component({
  selector: 'app-float-details',
  templateUrl: './float-details.component.html',
  styleUrls: ['./float-details.component.scss']
})
export class FloatDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren(LineChartComponent) lineCharts: LineChartComponent[];

  float$: Observable<Float>;
  saltinessSerie: object[];
  pressureSerie: object[];
  temperatureSerie: object[];

  constructor(private floatsMapQuery: FloatsMapQuery) {
    this.float$ = this.floatsMapQuery.selectActive();


  }

  ngOnInit() {
    this.float$.subscribe(float => {
      this.saltinessSerie = [
        {
          name: 'Saltiness',
          series: _.chain(_.range(100)).map(i => ({ name: i, value: _.random(0, 1000) })).value(),
          color: '#FF0000'
        }
      ];

      this.pressureSerie = [
        {
          name: 'Pressure',
          series: _.chain(_.range(100)).map(i => ({ name: i, value: _.random(0, 1000) })).value()
        }
      ];

      this.temperatureSerie = [
        {
          name: 'Temperature',
          series: _.chain(_.range(100)).map(i => ({ name: i, value: _.random(0, 1000) })).value()
        }
      ];
    });
  }

  ngAfterViewInit() {

  }


}
