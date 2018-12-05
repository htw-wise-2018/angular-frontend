import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxLineChartMarginDirective } from './directives/ngx-line-chart-margin.directive';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxChartsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatRadioModule,
    MatListModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  declarations: [
    NgxLineChartMarginDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxChartsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatRadioModule,
    MatListModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatFormFieldModule,

    NgxLineChartMarginDirective
  ]
})
export class SharedModule {
}
