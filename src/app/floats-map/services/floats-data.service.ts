import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Float } from '../models/float.model';

@Injectable({
  providedIn: 'root'
})
export class FloatsDataService {
  constructor(private httpClient: HttpClient) {

  }

  getMockFloats(count = 3500): Float[] {
    return _.range(count).map(() => ({
      latitude: _.random(-90, 90, true),
      longitude: _.random(-180, 180, true),
      saltiness: _.random(1, 2, true)
    }));
  }

  getFloats(): Observable<Float[]> {
    // return this.httpClient.get<Float[]>('assets/data.json');
    return this.httpClient.get<Float[]>('assets/last_seen.json').pipe(
      map((result: any) => result.features),
      map((features: object[]) => {
        return features.map((feature: any) => ({
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1]
        } as Float));
      })
    );

    /*
    return timer(1000).pipe(
      mapTo(this.getMockFloats())
    );
    */
  }
}

