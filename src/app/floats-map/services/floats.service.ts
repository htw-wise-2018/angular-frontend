import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FloatsResponse } from '../interfaces/floats-response';
import { Float } from '../models/float.model';

@Injectable({
  providedIn: 'root'
})
export class FloatsService {
  constructor(private httpClient: HttpClient) {

  }

  getFloats(): Observable<Float[]> {
    return this.httpClient.get<FloatsResponse>('assets/last_seen.json').pipe(
      map(response => response.features),
      map(features => {
        return features.map(feature => ({
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1]
        }));
      })
    );
  }

  getFloatDetails(): Observable<any> {
    return this.httpClient.get('lalala');
  }
}

