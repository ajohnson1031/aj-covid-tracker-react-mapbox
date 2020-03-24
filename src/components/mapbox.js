import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const styles = {
  width: "100%",
  height: "100%",
  position: "absolute"
};

const MapboxGLMap = ({ state }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWpvaG5zb24xMDMxIiwiYSI6ImNqNGgwM2p3dTA4amkzMm4xa3UybTNvc2cifQ.w6P87_Nfy48Nsqc3aV7itQ";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/ajohnson1031/ck84r3wfc05wa1ipbebi8dh51", // stylesheet location
        center: [state.state.lat, state.state.lng],
        zoom: state.state.zoom
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        let feats = [];

        axios
          .get(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json"
          )
          .then(res => {
            res.data.features.map(_ => {
              feats.push({
                id: _.attributes.OBJECTID,
                type: "Feature",
                properties: {
                  lat: _.attributes.Lat,
                  long: _.attributes.Long_,
                  province_state: _.attributes.Province_State,
                  country_region: _.attributes.Country_Region,
                  confirmed: _.attributes.Confirmed,
                  recovered: _.attributes.Recovered,
                  deaths: _.attributes.Deaths
                },
                geometry: {
                  coordinates: [_.geometry.x, _.geometry.y],
                  type: "Point"
                }
              });

              state.countCases(_.attributes.Confirmed);
            });
          })
          .catch(err => console.log(err))
          .finally(_ => {
            map.addSource("infected", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: feats
              }
            });

            map.addLayer({
              id: "points",
              source: "infected",
              type: "circle",
              paint: {
                "circle-color": "#FB6E6E",
                "circle-opacity": 0.5,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#FB6E6E",
                "circle-stroke-opacity": 0.8,
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  2,
                  ["*", 0.0015, ["number", ["get", "confirmed"]]],
                  3,
                  ["*", 0.003, ["number", ["get", "confirmed"]]],
                  4,
                  ["*", 0.005, ["number", ["get", "confirmed"]]],
                  5,
                  ["*", 0.005, ["number", ["get", "confirmed"]]]
                ]
              }
            });

            map.on("click", "points", function(e) {
              map.flyTo({ center: e.features[0].geometry.coordinates });
              const coordinates = e.features[0].geometry.coordinates.slice();
              const ps = e.features[0].properties.province_state;
              const cr = e.features[0].properties.country_region;
              const c = e.features[0].properties.confirmed;
              const r = e.features[0].properties.recovered;
              const f = e.features[0].properties.deaths;
              console.log(ps);
              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              //<li class="active">Active</li>
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `<h3>${ps !== "null" ? ps : ""} ${
                    ps !== "null" ? "" : cr
                  }</h3> <span class="divider"></span> <p class="ps-total"><span class="nix">Total Confirmed Cases</span>${c}</p> <span class="divider"></span> <ul><li class="recovered">Recovered: ${r}</li><li class="fatal">Fatal: ${f}</li></ul>`
                )
                .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "points", function() {
              map.getCanvas().style.cursor = "pointer";
            });

            // Change it back to a pointer when it leaves.
            map.on("mouseleave", "points", function() {
              map.getCanvas().style.cursor = "";
            });

            console.log(map.getLayer("points"));
          });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, state.state.lat, state.state.lng, state.state.zoom]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
