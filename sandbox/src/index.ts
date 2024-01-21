import { getVenue, showVenue, TGetVenueOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import Chart from "chart.js/auto";
import { lighten } from "color2k";
import data from "./data.json";
import { MappedinOrange, occupancyData, plugin, chartOptions } from "./chart";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueOptions = {
  venue: "mappedin-demo-office",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
};

async function init() {
  const venue = await getVenue(options);
  const mapView = await showVenue(document.getElementById("app")!, venue);
  mapView.addInteractivePolygonsForAllLocations();

  // this lists all the locations
  console.log(venue.locations);

  // const directoryListElement = document.getElementById("directory")!;

  // const alphabeticalLocations = venue.locations
  //   .filter((location) => location.type === "tenant")
  //   .sort((a, b) => (a.name < b.name ? -1 : 1));

  // alphabeticalLocations.forEach((location) => {
  //   const item = document.createElement("li");
  //   item.textContent = `${location.name}`;
  //   directoryListElement.appendChild(item);
  // });

  const startLocation = venue.locations.find(
    (location) => location.name === "01-D-001"
  );
  const endLocation = venue.locations.find(
    (location) => location.name === "02-D-184"
  );

  const directions = startLocation.directionsTo(endLocation);
  mapView.Journey.draw(directions, {
    pathOptions: {
      color: "green",
      nearRadius: 0.3,
    },
  });

  mapView.Camera.minZoom = 150;
  mapView.Camera.set({
    rotation: 0,
    tilt: 0.04,
  });

  function createHeatMap(occupancy: any) {
    var index = 0;
    venue.polygons.forEach((polygon) => {
      let demandLevel = data["deskDemand"][occupancy][index];
      if (polygon.layer === "Room" || polygon.layer === "Desk") {
        mapView.setPolygonColor(polygon, lighten(MappedinOrange, demandLevel));
        index = index + 1;
      }
    });
  }

  const chart = new Chart(
    document.getElementById("occupancy") as HTMLCanvasElement,
    {
      type: "bar",
      options: {
        ...chartOptions,
        onClick: (e) => {
          let res = chart.getElementsAtEventForMode(
            e,
            "nearest",
            {
              intersect: false,
              axis: "x",
            },
            true
          );
          let occupancy =
            data["occupancyByHour"][res[0].datasetIndex][res[0].index];
          createHeatMap(occupancy);
        },
      },
      plugins: [plugin],
      data: occupancyData,
    }
  );
}

init();
