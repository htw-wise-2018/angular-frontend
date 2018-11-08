import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';

import * as L from 'leaflet';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { environment } from '../../../../environments/environment';
import { FloatsMapQuery } from '../../queries/floats-map.query';
import { FloatsMapService } from '../../services/floats-map.service';

declare var myGlify: any;

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: L.Map;
  tilesLayer: L.Layer;
  saltinessLayer: HeatmapOverlay;

  constructor(
    private floatsMapQuery: FloatsMapQuery,
    private floatsMapService: FloatsMapService,
    private router: Router
  ) {
    this.initTiles();
    this.initSaltinessLayer();
    this.floatsMapService.loadFloats();
  }

  private _showMarkersLayer: boolean;

  @Input()
  set showMarkersLayer(show: boolean) {
    this._showMarkersLayer = show;
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

  ngOnInit() {
    const customDefaultIcon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconAnchor: [13, 41]
    });

    this.initBaseMap();

    let map = this.map;
    let isInit = false;
    this.floatsMapQuery.selectAll().pipe(
      untilDestroyed(this)
    ).subscribe(floats => {
      console.log("floats", floats);

      if(isInit)
        return;

      isInit = true;

      let points = floats.map(f => {
        let point = [f.latitude, f.longitude];
        point["id"] = f.id;
        return point;
      });

      let openFloatDetails = this.openFloatDetails.bind(this);
      myGlify.points({
        map: map,
        click: function (e, point, xy) {
          console.log(point);
          openFloatDetails(point["id"]);
        },
        size: 10,

        /* {Number} exagurates the size of the clickable area to make it easier to click a point */
        sensitivity: 25,
        color: {r: 30 / 255, g: 202 / 255, b: 227 / 255},
        opacity: 0.8,
        data: points,
        className: "glify-canvas"
      });

      this.saltinessLayer.setData({
        data: floats
      });

    });
  }

  ngOnDestroy() {
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

  openFloatDetails(id: ID) {
    this.router.navigate(['/float', id]);
  }
}
