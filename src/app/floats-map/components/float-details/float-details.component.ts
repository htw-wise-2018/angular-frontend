import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineChartComponent } from '@swimlane/ngx-charts';
import * as _ from 'lodash';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { Float } from '../../models/float.model';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';
import { FloatsMapStore } from '../../store/floats-map.store';

@Component({
  selector: 'app-float-details',
  templateUrl: './float-details.component.html',
  styleUrls: ['./float-details.component.scss']
})
export class FloatDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(LineChartComponent) lineCharts: LineChartComponent[];

  float$: Observable<Float>;
  saltinessSerie: object[];
  pressureSerie: object[];
  temperatureSerie: object[];

  constructor(
    private floatsMapService: FloatsMapService,
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapStore: FloatsMapStore,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.pipe(
      untilDestroyed(this)
    ).subscribe(paramMap => this.floatsMapStore.setActive(paramMap.get('id')));

    this.float$ = this.floatsMapQuery.selectActive();
  }

  ngOnInit() {
    this.float$.pipe(
      untilDestroyed(this)
    ).subscribe(float => {
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

  ngOnDestroy() {
    this.floatsMapStore.setActive(null);
  }
}
