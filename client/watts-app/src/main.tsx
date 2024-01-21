import {
  E_SDK_EVENT,
  getVenue,
  showVenue,
  STACKED_MAPS_STATE,
  STATE,
  TGetVenueMakerOptions,
  getVenueMaker
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueMakerOptions = { 
  mapId: "659efcf1040fcba69696e7b6", 
  key: "65a0422df128bbf7c7072349", 
  secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4", };

async function init() {
  const venue = await getVenueMaker(options);
  const mapView = await showVenue(document.getElementById("app")!, venue, {
    multiBufferRendering: true,
    xRayPath: true,
    loadOptions: {
      // outdoorGeometryLayers: [
      //   "Base",
      //   "Outdoor Obstruction",
      //   "Void",
      //   "Water Feature",
      //   "Parking Below",
      //   "Landscape Below",
      //   "Sidewalk Below",
      //   "Details Below",
      //   "Landscape",
      //   "Sidewalk",
      //   "Entrance Arrows",
      //   "Parking Lot Standard",
      //   "Parking Icon",
      //   "OD Tree Base",
      //   "OD Tree Top",
      //   "__TEXT__"
      // ]
    }
  });
  const start = venue.locations.find((l) => l.name === "3206D")!;
  const end = venue.locations.find((l) => l.name === "3307")!;
  mapView.Journey.draw(start.directionsTo(end), {
    pathOptions: {
      nearRadius: 0.3,
      farRadius: 1
    },
    connectionPathOptions: {
      nearRadius: 0.3,
      farRadius: 1
    }
  });
  mapView.FlatLabels.labelAllLocations();
  mapView.StackedMaps.enable({ verticalDistanceBetweenMaps: 75 });
  mapView.StackedMaps.showOverview();
  
}

init();
