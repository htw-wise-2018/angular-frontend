export interface FloatsResponse {
  crs: Crs;
  features?: (Feature)[] | null;
  type: string;
}
export interface Crs {
  properties: CrsProperties;
  type: string;
}
export interface CrsProperties {
  name: string;
}
export interface Feature {
  geometry: Geometry;
  properties: FeatureProperties;
  type: string;
}
export interface Geometry {
  coordinates?: [number, number];
  type: string;
}
export interface FeatureProperties {
  feature_type: string;
  identifier: string;
  last_seen: string;
}
