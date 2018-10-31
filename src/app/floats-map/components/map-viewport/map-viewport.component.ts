import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';
import { FloatsMapStore } from '../../store/floats-map.store';

@Component({
  selector: 'app-map-viewport',
  templateUrl: './map-viewport.component.html',
  styleUrls: ['./map-viewport.component.scss']
})
export class MapViewportComponent implements OnInit {
  saltinessLayerVisibility$: Observable<boolean>;
  markersLayerVisibility$: Observable<boolean>;
  sidenavOpened$: Observable<boolean>;

  sidenavMode: 'over' | 'push' | 'side' = 'over';
  sidenavHasBackdrop = false;

  constructor(
    private floatMapsQuery: FloatsMapQuery,
    private floatMapsService: FloatsMapService,
    private floatsMapStore: FloatsMapStore,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
    this.markersLayerVisibility$ = this.floatMapsQuery.selectMarkersLayerVisibility$;
    this.saltinessLayerVisibility$ = this.floatMapsQuery.selectSaltinessLayerVisibility$;
    this.sidenavOpened$ = this.floatMapsQuery.selectSidenavOpened$;
  }

  ngOnInit() {
    this.routerQuery.select(state => state.state.root.params).subscribe(params => {
      this.floatsMapStore.setActive(params.id);

      if (params.id) {
        this.floatMapsService.updateSidenavOpened(true);
      } else {
        this.floatMapsService.updateSidenavOpened(false);
      }
    });
  }

  onOpenChange(opened: boolean) {
    this.floatMapsService.updateSidenavOpened(opened);
  }

  async onSidenavClose() {
    await this.router.navigate(['/']);
  }
}
