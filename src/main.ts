import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import * as _ from 'lodash';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

const exclude: string[] = [
  'router',
  'floatsMap.ui.sidenavOpened'
];

persistState({
  serialize(data: any) {
    /** Custom serialize function to support exclude paths */
    return JSON.stringify(_.omit(data, exclude));
  }
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

