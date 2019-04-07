import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineChartComponent } from '@swimlane/ngx-charts';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Buoy } from '../../models/buoy.model';
import { BuoyDetailsQuery } from '../../queries/buoy-details.query';
import { BuoysMapQuery } from '../../queries/buoys-map.query';
import { BuoyDetailsService } from '../../services/buoy-details.service';
import { BuoysMapService } from '../../services/buoys-map.service';
import { AntPathLayerService } from '../../services/leaflet/layers/ant-path-layer.service';
import { BuoysMapStore } from '../../store/buoys-map.store';

@Component({
  selector: 'app-buoy-details',
  templateUrl: './buoy-details.component.html',
  styleUrls: ['./buoy-details.component.scss']
})
export class BuoyDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(LineChartComponent) lineCharts: LineChartComponent[];

  buoy$: Observable<Buoy>;
  pathLayerVisibility$: Observable<boolean>;
  buoyDetailsLoading$: Observable<boolean>;

  saltinessSeries$: Observable<object[]>;
  pressureSeries$: Observable<object[]>;
  temperatureSeries$: Observable<object[]>;

  constructor(
    private buoysMapService: BuoysMapService,
    private buoysMapQuery: BuoysMapQuery,
    private buoysMapStore: BuoysMapStore,
    private pathLayerService: AntPathLayerService,
    private buoyDetailsService: BuoyDetailsService,
    private buoyDetailsQuery: BuoyDetailsQuery,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.pipe(
      untilDestroyed(this)
    ).subscribe(paramMap => {
      if (paramMap.get('mode') === 'details') {
        const id = paramMap.get('id');

        this.buoyDetailsService.loadBuoyDetails(id);
        this.buoysMapStore.setActive(id);
      }

      this.buoysMapStore.updatePathLayerVisibility(paramMap.get('mode') === 'path');
    });

    this.buoy$ = this.buoysMapQuery.selectActive() as Observable<Buoy>;
    this.pathLayerVisibility$ = this.buoysMapQuery.selectPathLayerVisibility$;
    this.buoyDetailsLoading$ = this.buoyDetailsQuery.selectLoading();

    this.saltinessSeries$ = this.buoyDetailsQuery.selectBuoyDetails$.pipe(
      map(buoyDetails => buoyDetails.saltinessValues),
      map(saltinessValues => saltinessValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Saltiness', series }]))
    );

    this.temperatureSeries$ = this.buoyDetailsQuery.selectBuoyDetails$.pipe(
      map(buoyDetails => buoyDetails.temperatureValues),
      map(temperatureValues => temperatureValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Temperature', series }]))
    );

    this.pressureSeries$ = this.buoyDetailsQuery.selectBuoyDetails$.pipe(
      map(buoyDetails => buoyDetails.pressureValues),
      map(pressureValues => pressureValues.map((value, index) => ({ name: index, value: value }))),
      map(series => ([{ name: 'Pressure', series }]))
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.buoysMapStore.setActive(null);
    this.buoysMapStore.updatePathLayerVisibility(false);
  }
}
