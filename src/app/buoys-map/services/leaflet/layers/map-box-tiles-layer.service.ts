import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LeafletService } from '../leaflet.service';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class MapBoxTilesLayerService extends LayerService {
  constructor(leafletService: LeafletService) {
    super(leafletService);

    this.layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      id: 'mapbox.satellite',
      accessToken: environment.mapBoxApiKey,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    });
  }
}
