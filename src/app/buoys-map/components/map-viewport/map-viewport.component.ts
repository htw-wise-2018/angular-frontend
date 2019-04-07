import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { BuoysMapQuery } from '../../queries/buoys-map.query';
import { BuoysMapService } from '../../services/buoys-map.service';
import { BuoysMapStore } from '../../store/buoys-map.store';

@Component({
  selector: 'app-map-viewport',
  templateUrl: './map-viewport.component.html',
  styleUrls: ['./map-viewport.component.scss']
})
export class MapViewportComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  sidenavOpened$: Observable<boolean>;
  pathLayerVisibility$: Observable<boolean>;
  sidenavMode: 'over' | 'push' | 'side' = 'over';
  sidenavHasBackdrop = false;

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    private buoysMapService: BuoysMapService,
    private buoysMapStore: BuoysMapStore,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
    this.sidenavOpened$ = this.buoysMapQuery.selectSidenavOpened$;
    this.pathLayerVisibility$ = this.buoysMapQuery.selectPathLayerVisibility$;
  }

  ngOnInit() {
  }

  onOpenChange(opened: boolean) {
    this.buoysMapService.updateSidenavOpened(opened);
  }

  onSwipe() {
    this.buoysMapService.updateSidenavOpened(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.router.navigate(['/']);
  }

  onSidenavClose() {
    this.router.navigate(['/']);
  }

  onShowPathLayer() {
    const id = this.routerQuery.getValue().state.root.paramMap.get('id');
    this.router.navigate(['/buoy', id, 'path']);
  }
}
