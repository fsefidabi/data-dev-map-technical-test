import * as L from "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import Map from "./map"
import MeasurementUtils from "./measurementUtils"

export default class DrawableMap extends Map {
  constructor() {
    super()
  }

  init(containerId, lat, lng, zoom) {
    this.initMap(containerId, lat, lng, zoom)
    this.initDrawControl()

    this.map.on("pm:create", event => this.handlePMCreateEvent(event))
  }

  initDrawControl() {
    this.map.pm.addControls({
      drawings: true,
      editMode: true,
      cutPolygon: true,
      removalMode: true,
      drawText: false
    })
  }

  handlePMCreateEvent(event) {
    const layer = event.layer
    if (!layer) return
    this.calculateMeasurements(layer)
    layer.on("pm:edit", event => this.handlePMEditEvent(event))
  }

  handlePMEditEvent(event) {
    const layer = event.layer
    if (!layer) return
    this.calculateMeasurements(layer)
  }

  calculateMeasurements(layer) {
    const turfFeature = MeasurementUtils.convertLayerToTurfFeature(layer)

    if (layer instanceof L.Polygon) {
      const area = MeasurementUtils.calculatePolygonArea(turfFeature)
      layer.bindPopup("<div class='popup-text'><strong>Area:</strong> " + area.toFixed(3) + " m<sup>2</sup></div>").openPopup()
    } else if (layer instanceof L.Polyline) {
      const length = MeasurementUtils.calculateLength(turfFeature)
      layer.bindPopup("<div class='popup-text'><strong>Length:</strong> <span>" + length.toFixed(3) + " km</span></div>").openPopup()
    } else if (layer instanceof L.Circle) {
      const area = MeasurementUtils.calculateCircleArea(layer)
      layer.bindPopup("<div class='popup-text'><strong>Area:</strong> " + area.toFixed(3) + " m<sup>2</sup></div>").openPopup()
    }
  }
}
