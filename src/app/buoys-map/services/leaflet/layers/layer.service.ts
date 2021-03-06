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
      this.visibility$.pipe().subscribe(visibility => visibility ? this.show() : this.hide());
    } else {
      this.show();
    }
  }

  hide() {
    this.leafletService.getMap().removeLayer(this.layer);
  }

  show() {
    this.leafletService.getMap().addLayer(this.layer);
  }
}
