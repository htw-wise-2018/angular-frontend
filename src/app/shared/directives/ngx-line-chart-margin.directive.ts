import { Directive, Input, Self } from '@angular/core';
import { LineChartComponent } from '@swimlane/ngx-charts';

@Directive({
  /* tslint:disable:directive-selector */
  selector: 'ngx-charts-line-chart[margin]'
})
export class NgxLineChartMarginDirective {
  constructor(@Self() private lineChart: LineChartComponent) {
  }

  @Input() set margin(value: [number, number, number, number]) {
    this.lineChart.margin = value;
  }

}
