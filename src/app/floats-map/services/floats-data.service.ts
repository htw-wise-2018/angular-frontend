import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
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
    return this.httpClient.get<Float[]>('assets/data.json');
    /*
    return timer(1000).pipe(
      mapTo(this.getMockFloats())
    );
    */
  }
}
