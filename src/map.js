import * as L from "leaflet"

export default class Map {
  constructor() {
    this.map = null
  }

  initMap(containerId, lat, lng, zoom) {
    this.map = L.map(containerId, {
      center: [lat, lng],
      zoom: zoom
    })

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
    }).addTo(this.map)

    this.addLayersToMap()
  }

  addLayersToMap() {
    this.addRoadsGeoJSONLayer()
    this.addCameraPositionsGeoJSONLayer()
    this.addAdditionalLeftEdgesGeoJSONLayer()
  }

  addRoadsGeoJSONLayer() {
    fetch("./geojsons/roads.geojson")
      .then((res) => res.json())
      .then((roadsGeoJson) => {
        const layerOptions = {
          style: {
            color: "red",
            weight: 2,
            opacity: 1
          }
        }
        this.addGeoJSONLayer(roadsGeoJson, layerOptions)
      })
      .catch(error => {
        console.error(`Error happened in adding roads geoJSON layer: ${error}`)
      })
  }

  addCameraPositionsGeoJSONLayer() {
    fetch("./geojsons/camPos.geojson")
      .then((res) => res.json())
      .then((cameraPositionsGeoJson) => {
        const layerOptions = {
          pointToLayer: this.createCircleMarker
        }
        const layer = this.addGeoJSONLayer(cameraPositionsGeoJson, layerOptions)
        layer.eachLayer(this.handleCameraPositionClick)
      })
      .catch(error => {
        console.error(`Error happened in adding camera positions geoJSON layer: ${error}`)
      })
  }

  addAdditionalLeftEdgesGeoJSONLayer() {
    fetch("./geojsons/additionalLeftEdges.geojson")
      .then((res) => res.json())
      .then((additionalLeftEdgesGeoJson) => {
        const layerOptions = {
          style: {
            color: "blue",
            weight: 2,
            opacity: 1
          }
        }
        this.addGeoJSONLayer(additionalLeftEdgesGeoJson, layerOptions)
      })
      .catch(error => {
        console.error(`Error happened in adding additional left edges geoJSON layer: ${error}`)
      })
  }

  addGeoJSONLayer(geoJSON, options) {
    return L.geoJSON(geoJSON, { ...options, pmIgnore: true }).addTo(this.map)
  }

  createCircleMarker(feature, latLng) {
    const markerOptions = {
      radius: 3,
      fillColor: "#ff7800",
      color: "#874801",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
      pmIgnore: true
    }

    return L.circleMarker(latLng, markerOptions)
  }

  async handleCameraPositionClick(layer) {
    const imageName = layer.feature.properties?.code
    let htmlContent = "<div class='flex-col-wrapper'><span>Image not found</span><input type='file' id='camera-pic' name='camera-pic' accept='image/png, image/jpeg' title='sd'/></div>"

    layer.on("popupopen", () => {
      handleFileInputChange("camera-pic", (imageUrl) => {
        let htmlContent = `<img src="${imageUrl}" />`
        layer.setPopupContent(htmlContent)
      })
    })

    await fetch(`./images/${imageName}`).then(response => {
      const contentLength = response.headers.get("Content-Length")
      if (imageName && parseInt(contentLength)) {
        htmlContent = "<img src='/images/" + imageName + "' />"
      }
    })

    layer.bindPopup(htmlContent, {
      closeButton: false
    })

  }
}

function handleFileInputChange(inputId, cb) {
  const fileInput = document.getElementById(inputId)
  if (!fileInput) return

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    cb(imageUrl)
  })
}
