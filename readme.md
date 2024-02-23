# Data Dev - Map Technical Test

This project represents the implementation of a technical test, containing all three specified tasks in the test description :map integration, drawing on map, and measurement on map.

![screenshot](https://github.com/fsefidabi/data-dev-map-technical-test/blob/master/screenshot.png)

## Stack
- HTML, CSS, JavaScript
- Leaflet.js for mapping functionalities
- Leaflet-Geoman for drawing and editing shapes on the map
- Turf for geospatial analysis and calculations

## Features
- Map Integration
  - Successfully integrated a map component into a web application. 
  - Displayed markers for sample shapefiles.
  - Implemented functionality to show related images in tooltips upon clicking on camera points. Users can also upload images via an input field if not already provided.
- Drawing on Map
  - Enabled users to draw shapes (lines, polygons, circles, etc.) on the map using user interactions like click and drag.
  - Enabled users to edit and delete drawn shapes.
- Measurement on Map
  - Implemented features to calculate the length and area of the drawn shapes.
    

## Quick Start
```bash
# clone the repository
git clone https://github.com/fsefidabi/data-dev-map-technical-test
# move to the directory
cd data-dev-map-technical-test
# install dependencies
npm install
# run the application in development mode
npm run dev
```

Project is running on http://localhost:3000.
