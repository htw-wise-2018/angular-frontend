import { ID } from '@datorama/akita';
import { Coordinate } from './float-details.model';

export interface Float {
  id: ID;
  coordinates: Coordinate;
}

export function createFloat({ id, coordinates }: Partial<Float>): Float {
  return {
    id,
    coordinates
  };
}
