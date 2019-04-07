import { ID } from '@datorama/akita';
import { Coordinates } from './buoy-details.model';

export interface Buoy {
  id: ID;
  coordinates: Coordinates;
}

export function createBuoy({ id, coordinates }: Partial<Buoy>): Buoy {
  return {
    id,
    coordinates
  };
}
