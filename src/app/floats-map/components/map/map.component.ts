import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';
import { GlifyService } from '../../services/leaflet/glify.service';
import { LeafletService } from '../../services/leaflet/leaflet.service';
import { MapBoxTilesLayerService } from '../../services/leaflet/layer/map-box-tiles-layer.service';
import { SaltinessLayerService } from '../../services/leaflet/layer/saltiness-layer.service';


@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer: ElementRef;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService,
    private router: Router,
    private leafletService: LeafletService,
    private mapBoxTilesLayerService: MapBoxTilesLayerService,
    private saltinessLayerService: SaltinessLayerService,
    private glifyService: GlifyService
  ) {
    this.floatsMapService.loadFloats();
  }


  ngOnInit() {
    this.leafletService.init(this.mapContainer.nativeElement);
    this.mapBoxTilesLayerService.init();
    this.saltinessLayerService.init();
    this.glifyService.init((e, point, xy) => this.openFloatDetails(point['id']));
  }

  openFloatDetails(id: ID) {
    this.router.navigate(['/float', id]);
  }
}
