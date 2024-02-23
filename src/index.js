import DrawableMap from "./drawableMap"
import "leaflet/dist/leaflet.css"
import "./style.css"

const drawableMap = new DrawableMap()
drawableMap.init("map-container", 52.1139203, 8.6652427, 18)
