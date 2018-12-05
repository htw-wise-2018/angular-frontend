import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FloatsMapService } from '../services/floats-map.service';

@Injectable({
  providedIn: 'root'
})
export class SidenavGuard implements CanActivate, CanDeactivate<any> {
  constructor(private floatsMapService: FloatsMapService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    switch (next.paramMap.get('mode')) {
      case 'details':
        this.floatsMapService.updateSidenavOpened(true);
        break;
      default:
        this.floatsMapService.updateSidenavOpened(false);
    }

    return true;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.floatsMapService.updateSidenavOpened(false);

    return true;
  }
}
