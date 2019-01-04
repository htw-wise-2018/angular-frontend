import { ID } from '@datorama/akita';
import { Coordinate } from './float-details.model';

export interface Float {
  id: ID;
  coordinate: Coordinate;
}

export function createFloat({ id, coordinate }: Partial<Float>): Float {
  return {
    id,
    coordinate
  };
}
