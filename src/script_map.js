import "./styles.css";
import data from "./data.js";
import L from "leaflet";
require("leaflet-draw"); 
const position = [37.3, -121.86];
const map = L.map("mapid").setView(position, 12.2);

L.tileLayer("http://b.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --Drawing tools implimented here
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

let onOff = true; //~~~THIS CONTROLS THE DRAWING TOOLS!!!~~~~=> if true then all drawing/edit tools apeare else they gone

// drawOption and  editOption are set in there own object for better contorl
let drawOption = {
  polygon: {
    allowIntersection: false, // Restricts shapes to simple polygons
    drawError: {
      color: "#e1e100", // Color the shape will turn when intersects
      message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
    },
    shapeOptions: {
      color: "#97009c"
    }
  },
  // disable toolbar item by setting it to false
  polyline: false,
  circle: false, // Turns off this drawing tool
  rectangle: false,
  marker: false,
  circlemarker: false
};
let editOption = {
  featureGroup: editableLayers, //REQUIRED!!
  remove: true
};

// DrawingTools option object
var drawPluginOptions = {
  draw: onOff ? drawOption : false,
  edit: onOff ? editOption : false
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

map.on("draw:created", function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === "marker") {
    layer.bindPopup("A popup!");
  }
  editableLayers.addLayer(layer);
});
// end of drawing tools display ///

//render each marker to the map
let properties = data.features;

function onClick(e) {
  document.getElementById("panel").classList.add("show-panel", "toggle");
  let propertyName = this.getPopup();
  // console.log(propertyName["_content"]);
  // console.log(properties);
  let selectedProperty = null;
  for (let el of properties) {
    if (el.properties["Project Name"] === propertyName["_content"]) {
      selectedProperty = el;
    }
  }
  document.getElementById(
    "panel"
  ).innerHTML = `<span id="toggle"></span><div class="panelDescription"> 
     <p> <b>Name:</b> ${selectedProperty.properties["Project Name"]}</p>

     <p> <b>Address:</b> ${selectedProperty.properties.Address}, ${
    selectedProperty.properties.City
  }</p>

  <p> <b>Company:</b> ${selectedProperty.properties["Owner/Developer"]}</p>
  <p> <b>Presentation in Pac:</b> ${
    selectedProperty.properties["Presentation in PAC"]
  }</p>
  <p> <b>Status:</b> ${selectedProperty.properties["Project Current State"]}</p>
  <p> <b>Project Overview:</b> ${
    selectedProperty.properties["Project Overview"]
  }</p>
      <p> <b>Catalyze SV's role:</b> ${
        selectedProperty.properties["Catalyze SV's Role"]
      }</p>
  </div>`;
  //console.log(selectedProperty);
  toggleFunc();
}

var myIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/000000/real-estate.png"
});
function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties["Project Name"]) {
    layer.bindPopup(feature.properties["Project Name"]).on("click", onClick);
  }
}
L.geoJSON(properties, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, { icon: myIcon });
  },
  onEachFeature: onEachFeature
}).addTo(map);

function toggleFunc(e) {
  //console.log(document.getElementById("toggle"));
  document.getElementById("toggle").addEventListener("click", function() {
    var element = document.getElementById("panel");
    if (element.classList.contains("show-panel")) {
      element.classList.remove("show-panel");
    } else {
      element.classList.add("show-panel");
    }
  });
}
