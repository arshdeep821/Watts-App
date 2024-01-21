import {
  showVenue,
  TGetVenueMakerOptions,
  getVenueMaker
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import axios from "axios";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueMakerOptions = { 
  mapId: "659efcf1040fcba69696e7b6", 
  key: "65a0422df128bbf7c7072349", 
  secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4", };

async function get_rooms() {
  const response = await axios.get("http://localhost:3000/api/v1/object");
  return response.data as room[];
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

const venue = await getVenueMaker(options);
const mapView = await showVenue(document.getElementById("app")!, venue, {
  multiBufferRendering: true,
  xRayPath: true,
  loadOptions: {
  }
});

const process_colours = (room: room): void => {
  const polygons = venue.locations.find(location => location.name === room.room_id)?.polygons;
  const totalUsage = room.usage.reduce((sum, current) => sum + current.value, 0) / room.threshold;
  if (polygons) {
    if (totalUsage >= 1) {
      mapView.setPolygonColor(polygons[0], "#FF0000");
    } else if (totalUsage >= 0.66) { 
      mapView.setPolygonColor(polygons[0], "#FF6347");
    } else {
      mapView.setPolygonColor(polygons[0], "#FFA07A");
    }
  }
}

const wayfinding = (threshold: room): void => {
  const start = venue.locations.find((l) => l.name == "LL201")!;
  const end = venue.locations.find((l) => l.name === threshold.room_id)!;
  console.error(start, end);
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
}

async function init() {
  mapView.setBackgroundColor("#050505");
  const rooms = await get_rooms();
  for (const room of rooms) {
    process_colours(room);
  }
  const thresholds = rooms.filter(room => {
    const totalUsage = room.usage.reduce((sum, current) => sum + current.value, 0);
    return totalUsage > room.threshold;
  });
  console.error(thresholds[0].room_id);
  if (thresholds) {
    wayfinding(thresholds[0]);
  }
  mapView.FloatingLabels.labelAllLocations();
}

init();
