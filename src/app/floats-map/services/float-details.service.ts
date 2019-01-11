import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FloatDetailsResponse } from '../interfaces/float-details-response';
import { createFloatDetails } from '../models/float-details.model';
import { FloatDetailsStore } from '../store/float-details.store';

@Injectable({
  providedIn: 'root'
})
export class FloatDetailsService {
  constructor(
    private httpClient: HttpClient,
    private floatDetailsStore: FloatDetailsStore
  ) {

  }

  loadFloatDetails(id: ID) {
    this.floatDetailsStore.setLoading(true);

    this.httpClient.get<FloatDetailsResponse>(environment.endpoints.details.replace('{id}', id.toString())).pipe(
      map(response => response.data),
      map(floatDetails => ({ ...floatDetails, id })),
      map(createFloatDetails),
    ).subscribe(floatDetails => {
      this.floatDetailsStore.update({
        floatDetails
      });

      this.floatDetailsStore.setLoading(false);
    });
  }
}

