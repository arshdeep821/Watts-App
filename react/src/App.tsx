import React, { useEffect, useRef, useState } from "react";
import { TGetVenueMakerOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import axios from "axios";
import useMapView from "./useMapView";
import useVenue from "./useVenue";

const options: TGetVenueMakerOptions = {
  mapId: "659efcf1040fcba69696e7b6",
  key: "65a0422df128bbf7c7072349",
  secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4",
};

interface Room {
  room_id: string;
  _id: string;
  usage: TimeUsage[];
  threshold: number;
}

interface TimeUsage {
  _id: string;
  time: string;
  value: number;
}

export default function App() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const venue = useVenue(options);
  const mapView = useMapView(mapRef.current, venue, {
    multiBufferRendering: true,
    xRayPath: true,
    loadOptions: {},
  });
  const [currentEndLocation, setCurrentEndLocation] = React.useState(0);

  const endLocations = [
    "CITR Radio LL502",
    "INS Market LL301",
    "Flavour Lab LL104",
  ];

  const incrementEndLocation = () => {
    setCurrentEndLocation((currentEndLocation + 1) % endLocations.length);
  };

  const onPress = () => {
    incrementEndLocation();
  };

  useEffect(() => {
    const init = async () => {
      if (!mapView || !venue) return;

      mapView.setBackgroundColor("#050505");
      const rooms = await get_rooms();
      rooms.forEach((room) => process_colours(room));

      const thresholds = rooms.filter((room) => {
        const totalUsage = room.usage.reduce(
          (sum, current) => sum + current.value,
          0
        );
        return totalUsage > room.threshold;
      });

      if (thresholds.length > 0) {
        wayfinding(thresholds[0]);
      }

      mapView.FloatingLabels.labelAllLocations();
    };

    init();
  }, [mapView, venue, currentEndLocation]);

  async function get_rooms() {
    const response = await axios.get("http://localhost:3000/api/v1/object");
    const rooms: Room[] = response.data;
    return rooms;
  }

  function process_colours(room: Room) {
    const polygons = venue.locations.find(
      (location) => location.name === room.room_id
    )?.polygons;
    const totalUsage =
      room.usage.reduce((sum, current) => sum + current.value, 0) /
      room.threshold;
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

  function wayfinding(threshold: Room) {
    const start = venue.locations.find((l) => l.name === "LL201");
    const end = venue.locations.find(
      (l) => l.name === endLocations[currentEndLocation]
    );
    if (start && end) {
      console.error(start, end);
      mapView.Journey.draw(start.directionsTo(end), {
        pathOptions: {
          nearRadius: 0.3,
          farRadius: 4,
        },
        connectionPathOptions: {
          nearRadius: 0.3,
          farRadius: 4,
        },
      });
    }
  }

  return (
    <>
      <button onClick={onPress}>Press me to change route</button>
      <div id="app" ref={mapRef} />
    </>
  );
}
