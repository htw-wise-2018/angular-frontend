import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { BuoysMapService } from '../../services/buoys-map.service';

@Component({
  selector: 'app-close-path-button',
  templateUrl: './close-path-button.component.html',
  styleUrls: ['./close-path-button.component.scss']
})
export class ClosePathButtonComponent implements OnInit {

  constructor(
    private buoysMapService: BuoysMapService,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
  }

  ngOnInit() {
  }


  onClick() {
    const id = this.routerQuery.getValue().state.root.paramMap.get('id');
    this.router.navigate(['/buoy', id, 'details']);
  }
}
