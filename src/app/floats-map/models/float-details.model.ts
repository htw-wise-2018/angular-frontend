import { ID } from '@datorama/akita';

export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface FloatDetails {
  id: ID;
  path: Coordinate[];
  saltinessValues: number[];
  pressureValues: number[];
  temperatureValues: number[];
}

export function createFloatDetails({ id, path, saltinessValues, pressureValues, temperatureValues }: Partial<FloatDetails>): FloatDetails {
  return {
    id,
    path,
    saltinessValues,
    pressureValues,
    temperatureValues
  };
}
