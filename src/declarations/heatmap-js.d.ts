declare class HeatmapOverlay extends L.Layer {
  constructor(
    config: {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      radius: number;

      maxOpacity: number;
      // scales the radius based on map zoom
      scaleRadius: boolean;
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      useLocalExtrema: boolean;
      // which field name in your data represents the latitude - default "lat"
      latField: string;
      // which field name in your data represents the longitude - default "lng"
      lngField: string;
      // which field name in your data represents the data value - default "value"
      valueField: string;
    }
  )

  setData(data: { min?: number, max?: number; data: object[] });

  addData(pointOrArray: object | object[]);
}


