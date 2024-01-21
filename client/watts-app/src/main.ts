import {
  showVenue,
  TGetVenueMakerOptions,
  getVenueMaker,
  TColor
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
const axios = require("axios");

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueMakerOptions = { 
  mapId: "659efcf1040fcba69696e7b6", 
  key: "65a0422df128bbf7c7072349", 
  secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4", };

const redColor: TColor = {
  hex: "#FF0000",
  opacity: 1.0,
  rgba: "rgba(255, 0, 0, 1)"
};

async function get_rooms() {
  const response = await axios.get("http://localhost:3000/api/v1/object");
  return response.data.toJSON() as room[];
}

interface room {
  room_id: string;
  _id: string;
  usage: time_usage[];
  threshold: number;
}

interface time_usage {
  _id: string;
  time: string;
  value: number;
}

const process_colours = (name: string, mapView, venue): TColor[] => {
  const polygons = venue.locations.find(location => location.name === name)?.polygons;
  if (polygons) {
    mapView.setPolygonColor(polygons[0], "#BF4320");
  }
}

async function init() {
  const venue = await getVenueMaker(options);
  const mapView = await showVenue(document.getElementById("app")!, venue, {
    multiBufferRendering: true,
    xRayPath: true,
    loadOptions: {
    }
  });
  const start = venue.locations.find((l) => l.name === "LL201")!;
  const end = venue.locations.find((l) => l.name === "Teadot 1303")!;
  mapView.Journey.draw(start.directionsTo(end), {
    pathOptions: {
      nearRadius: .3,
      farRadius: 4
    },
    connectionPathOptions: {
      nearRadius: .3,
      farRadius: 4
    }
  });
  mapView.FlatLabels.labelAllLocations();
  // mapView.StackedMaps.enable({ verticalDistanceBetweenMaps: 150 });
  // mapView.StackedMaps.showOverview();
  // const colors = ["dodgerblue", "pink", "green", "orange", "tomato", "gray"];
  
}

init();
