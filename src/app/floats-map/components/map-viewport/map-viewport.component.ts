import { Component, HostListener, OnInit } from '@angular/core';
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
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService,
    private floatsMapStore: FloatsMapStore,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
    this.markersLayerVisibility$ = this.floatsMapQuery.selectMarkersLayerVisibility$;
    this.saltinessLayerVisibility$ = this.floatsMapQuery.selectSaltinessLayerVisibility$;
    this.sidenavOpened$ = this.floatsMapQuery.selectSidenavOpened$;
  }

  ngOnInit() {
  }

  onOpenChange(opened: boolean) {
    this.floatsMapService.updateSidenavOpened(opened);
  }

  onSwipe() {
    this.floatsMapService.updateSidenavOpened(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.floatsMapService.updateSidenavOpened(false);
  }

  async onSidenavClose() {
    await this.router.navigate(['/']);
  }
}
