import { ID } from '@datorama/akita';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface BuoyDetails {
  id: ID;
  path: Coordinates[];
  saltinessValues: number[];
  pressureValues: number[];
  temperatureValues: number[];
}

export function createBuoyDetails({ id, path, saltinessValues, pressureValues, temperatureValues }: Partial<BuoyDetails>): BuoyDetails {
  return {
    id,
    path,
    saltinessValues,
    pressureValues,
    temperatureValues
  };
}
