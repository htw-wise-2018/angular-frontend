import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { ViewportComponent } from './components/viewport/viewport.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [HeaderComponent, ViewportComponent],
  exports: [
    HeaderComponent,
    ViewportComponent
  ]
})
export class CoreModule {
}
