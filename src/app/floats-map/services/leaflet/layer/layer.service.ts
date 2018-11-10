import { Observable } from 'rxjs';
import { LeafletService } from '../leaflet.service';

export abstract class LayerService {
  protected layer = null;

  protected constructor(
    private leafletService: LeafletService,
    private visibility$: Observable<boolean> = null
  ) {
  }

  init() {
    if (this.visibility$) {
      this.visibility$.subscribe(visibility => visibility ? this.show() : this.hide());
    } else {
      this.show();
    }
  }

  private hide() {
    this.layer.removeFrom(this.leafletService.getMap());
  }

  private show() {
    this.layer.addTo(this.leafletService.getMap());
  }
}
