import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
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
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  sidenavOpened$: Observable<boolean>;
  pathLayerVisibility$: Observable<boolean>;
  sidenavMode: 'over' | 'push' | 'side' = 'over';
  sidenavHasBackdrop = false;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService,
    private floatsMapStore: FloatsMapStore,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
    this.sidenavOpened$ = this.floatsMapQuery.selectSidenavOpened$;
    this.pathLayerVisibility$ = this.floatsMapQuery.selectPathLayerVisibility$;
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
    this.router.navigate(['/']);
  }

  onSidenavClose() {
    this.router.navigate(['/']);
  }

  onShowPathLayer() {
    const id = this.routerQuery.getSnapshot().state.root.paramMap.get('id');
    this.router.navigate(['/float', id, 'path']);
  }
}
