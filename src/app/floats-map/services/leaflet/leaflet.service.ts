import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {
  private map = null;

  constructor() {
  }


  init(mapElement: HTMLDivElement) {
    const bounds = L.latLngBounds(
      { lat: -85, lng: -175 },
      { lat: 85, lng: 175 }
    );

    const mapOptions = {
      attributionControl: true,
      zoomControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      minZoom: 3
    };

    this.map = L.map(mapElement, mapOptions).setView(bounds.getCenter(), 3);
  }

  getMap() {
    return this.map;
  }
}
