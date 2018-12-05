import { guid, ID } from '@datorama/akita';

export interface PathCoordinate {
  id: ID;
  longitude: number;
  latitude: number;
}

export function createPathCoordinate({ longitude, latitude }: Partial<PathCoordinate>): PathCoordinate {
  return {
    id: guid(),
    longitude,
    latitude
  };
}
