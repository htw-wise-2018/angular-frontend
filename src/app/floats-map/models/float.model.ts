import { ID } from '@datorama/akita';

export interface Float {
  id: ID;
  longitude: number;
  latitude: number;
}

export function createFloat({ id, longitude, latitude }: Partial<Float>): Float {
  return {
    id,
    longitude,
    latitude
  };
}
