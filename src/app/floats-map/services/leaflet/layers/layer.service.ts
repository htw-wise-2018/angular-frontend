import { Observable } from 'rxjs';
import { LeafletService } from '../leaflet.service';

export abstract class LayerService {
  protected layer = null;

  protected constructor(
    protected leafletService: LeafletService,
    protected visibility$: Observable<boolean> = null
  ) {
  }

  init() {
    if (this.visibility$) {
      this.visibility$.subscribe(visibility => visibility ? this.show() : this.hide());
    } else {
      this.show();
    }
  }

  protected hide() {
    this.layer.removeFrom(this.leafletService.getMap());
  }

  protected show() {
    this.layer.addTo(this.leafletService.getMap());
  }
}
