import * as turf from "@turf/turf"

export default class MeasurementUtils {
  static convertLayerToTurfFeature(layer) {
    return turf.feature(layer.toGeoJSON().geometry)
  }

  static calculatePolygonArea(feature) {
    return turf.area(feature)
  }

  static calculateCircleArea(layer) {
    const radius = layer.getRadius()
    return Math.PI * radius * radius
  }

  static calculateLength(feature) {
    return turf.length(feature, { units: "kilometers" })
  }
}
