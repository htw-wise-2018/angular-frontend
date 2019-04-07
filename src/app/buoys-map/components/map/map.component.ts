import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { BuoysMapQuery } from '../../queries/buoys-map.query';
import { BuoysMapService } from '../../services/buoys-map.service';
import { AntPathLayerService } from '../../services/leaflet/layers/ant-path-layer.service';
import { EsriOceanBasemapTilesLayerService } from '../../services/leaflet/layers/esri-ocean-basemap-tiles-layer.service';
import { GlifyMarkersLayerService } from '../../services/leaflet/layers/glify-markers-layer.service';
import { HeatMapLayerService } from '../../services/leaflet/layers/heat-map-layer.service';
import { LeafletService } from '../../services/leaflet/leaflet.service';


@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer: ElementRef;

  constructor(
    private buoysMapQuery: BuoysMapQuery,
    private buoysMapService: BuoysMapService,
    private router: Router,
    private leafletService: LeafletService,
    private esriOceanBasemapTilesLayerService: EsriOceanBasemapTilesLayerService,
    private heatMapLayer: HeatMapLayerService,
    private markersLayerService: GlifyMarkersLayerService,
    private antPathLayerService: AntPathLayerService
  ) {
    this.buoysMapService.loadBuoys();
    this.markersLayerService.onClick((e, point, xy) => this.openBuoyDetails(point['id']));
    this.markersLayerService.onNoPointClick(() => this.closeBuoyDetails());
  }


  ngOnInit() {
    this.leafletService.init(this.mapContainer.nativeElement);

    this.esriOceanBasemapTilesLayerService.init();
    this.markersLayerService.init();
    this.antPathLayerService.init();
    this.heatMapLayer.init();
  }

  openBuoyDetails(id: ID) {
    this.router.navigate(['/buoy', id, 'details']);
  }

  closeBuoyDetails() {
    this.router.navigate(['/']);
  }
}
