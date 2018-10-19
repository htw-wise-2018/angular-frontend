export interface FloatsResponse {
  crs: Crs;
  features?: (FeaturesEntity)[] | null;
  type: string;
}
export interface Crs {
  properties: CrsProperties;
  type: string;
}
export interface CrsProperties {
  name: string;
}
export interface FeaturesEntity {
  geometry: Geometry;
  properties: FeaturesEntityProperties;
  type: string;
}
export interface Geometry {
  coordinates?: [number, number];
  type: string;
}
export interface FeaturesEntityProperties {
  feature_type: string;
  identifier: string;
  last_seen: string;
}
