import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { environment } from '../../../../environments/environment';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  private _showMarkersLayer: boolean;

  @Input()
  set showMarkersLayer(show: boolean) {
    this._showMarkersLayer = show;

    if (this.map) {
      if (show) {
        this.markersLayer.addTo(this.map);
      } else {
        this.markersLayer.removeFrom(this.map);
      }
    }
  }

  private _showSaltinessLayer: boolean;

  @Input()
  set showSaltinessLayer(show: boolean) {
    this._showSaltinessLayer = show;

    if (this.map) {
      if (show) {
        this.saltinessLayer.addTo(this.map);
      } else {
        this.saltinessLayer.removeFrom(this.map);
      }
    }
  }


  map: L.Map;
  tilesLayer: L.Layer;
  markersLayer: L.MarkerClusterGroup;
  saltinessLayer: HeatmapOverlay;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService
  ) {
    this.initTiles();
    this.initSaltinessLayer();
    this.initMarkersLayer();
    this.floatsMapService.loadFloats();
  }

  ngOnInit() {
    const customDefaultIcon: L.Icon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconAnchor: [13, 41]
    });

    this.initBaseMap();

    this.floatsMapQuery.selectAll().subscribe(floats => {
      this.saltinessLayer.setData({
        data: floats
      });
      this.markersLayer.addLayers(
        floats.map(
          float => L.marker(
            [float.latitude, float.longitude], {
              icon: customDefaultIcon
            }
          ).bindPopup('TEEEST')
        )
      );
    });
  }

  initBaseMap() {
    const bounds = L.latLngBounds(
      { lat: -85, lng: -175 },
      { lat: 85, lng: 175 }
    );

    const mapOptions: L.MapOptions = {
      attributionControl: true,
      zoomControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      minZoom: 3
    };

    this.map = L.map(this.mapContainer.nativeElement, mapOptions).setView(bounds.getCenter(), 3);
    this.tilesLayer.addTo(this.map);

    if (this._showSaltinessLayer) {
      this.saltinessLayer.addTo(this.map);
    }

    if (this._showMarkersLayer) {
      this.markersLayer.addTo(this.map);
    }
  }

  initTiles() {
    this.tilesLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      id: 'mapbox.satellite',
      accessToken: environment.mapBoxApiKey,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    });
  }

  initSaltinessLayer() {
    this.saltinessLayer = new HeatmapOverlay({
      radius: 1.25,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'saltiness'
    });
  }

  initMarkersLayer() {
    this.markersLayer = L.markerClusterGroup({
      maxClusterRadius: 45
    });
  }
}
