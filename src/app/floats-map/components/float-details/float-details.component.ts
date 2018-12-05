import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineChartComponent } from '@swimlane/ngx-charts';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Float } from '../../models/float.model';
import { FloatDetailsQuery } from '../../queries/float-details.query';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatDetailsService } from '../../services/float-details.service';
import { FloatsMapService } from '../../services/floats-map.service';
import { AntPathLayerService } from '../../services/leaflet/layers/ant-path-layer.service';
import { FloatsMapStore } from '../../store/floats-map.store';

@Component({
  selector: 'app-float-details',
  templateUrl: './float-details.component.html',
  styleUrls: ['./float-details.component.scss']
})
export class FloatDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(LineChartComponent) lineCharts: LineChartComponent[];

  float$: Observable<Float>;
  pathLayerVisibility$: Observable<boolean>;
  floatDetailsLoading$: Observable<boolean>;

  saltinessSerie$: Observable<object[]>;
  pressureSerie$: Observable<object[]>;
  temperatureSerie$: Observable<object[]>;

  constructor(
    private floatsMapService: FloatsMapService,
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapStore: FloatsMapStore,
    private pathLayerService: AntPathLayerService,
    private floatDetailsService: FloatDetailsService,
    private floatDetailsQuery: FloatDetailsQuery,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.pipe(
      untilDestroyed(this)
    ).subscribe(paramMap => {
      if (paramMap.get('mode') === 'details') {
        const id = paramMap.get('id');

        this.floatDetailsService.loadFloatDetails(id);
        this.floatsMapStore.setActive(id);
      }

      this.floatsMapStore.updatePathLayerVisibility(paramMap.get('mode') === 'path');
    });

    this.float$ = this.floatsMapQuery.selectActive();
    this.pathLayerVisibility$ = this.floatsMapQuery.selectPathLayerVisibility$;
    this.floatDetailsLoading$ = this.floatDetailsQuery.selectLoading();

    this.saltinessSerie$ = this.floatDetailsQuery.selectFloatDetails$.pipe(
      map(floatDetails => floatDetails.saltinessValues),
      map(saltinessValues => saltinessValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Saltiness', series }]))
    );

    this.temperatureSerie$ = this.floatDetailsQuery.selectFloatDetails$.pipe(
      map(floatDetails => floatDetails.temperatureValues),
      map(temperatureValues => temperatureValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Temperature', series }]))
    );

    this.pressureSerie$ = this.floatDetailsQuery.selectFloatDetails$.pipe(
      map(floatDetails => floatDetails.pressureValues),
      map(pressureValues => pressureValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Pressure', series }]))
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.floatsMapStore.setActive(null);
    this.floatsMapStore.updatePathLayerVisibility(false);
  }
}
