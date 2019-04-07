import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BuoysMapService } from '../services/buoys-map.service';

@Injectable({
  providedIn: 'root'
})
export class SidenavGuard implements CanActivate, CanDeactivate<any> {
  constructor(private buoysMapService: BuoysMapService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    switch (next.paramMap.get('mode')) {
      case 'details':
        this.buoysMapService.updateSidenavOpened(true);
        break;
      default:
        this.buoysMapService.updateSidenavOpened(false);
    }

    return true;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.buoysMapService.updateSidenavOpened(false);

    return true;
  }
}
