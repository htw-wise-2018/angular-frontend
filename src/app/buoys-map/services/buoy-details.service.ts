import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BuoyDetailsResponse } from '../interfaces/buoy-details-response';
import { createBuoyDetails } from '../models/buoy-details.model';
import { BuoyDetailsStore } from '../store/buoy-details.store';

@Injectable({
  providedIn: 'root'
})
export class BuoyDetailsService {
  constructor(
    private httpClient: HttpClient,
    private buoyDetailsStore: BuoyDetailsStore
  ) {

  }

  loadBuoyDetails(id: ID) {
    this.buoyDetailsStore.setLoading(true);

    this.httpClient.get<BuoyDetailsResponse>(environment.endpoints.details.replace('{id}', id.toString())).pipe(
      map(response => response.data),
      map(buoyDetails => ({ ...buoyDetails, id })),
      map(createBuoyDetails),
    ).subscribe(buoyDetails => {
      this.buoyDetailsStore.update({
        buoyDetails: buoyDetails
      });

      this.buoyDetailsStore.setLoading(false);
    });
  }
}

