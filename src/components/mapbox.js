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
        center: [state.lat, state.lng],
        zoom: state.zoom
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
              state.highestRates([
                _.attributes.Province_State,
                _.attributes.Country_Region,
                _.attributes.Confirmed,
                _.attributes.Deaths,
                _.attributes.Recovered
              ]);
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

            map.addLayer({
              id: "pointsOver",
              source: "infected",
              type: "circle",
              paint: {
                "circle-color": "#FB6E6E",
                "circle-opacity": 0,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#FB6E6E",
                "circle-stroke-opacity": 0.2,
                "circle-radius": 10
              }
            });

            function clickMap(e) {
              map.flyTo({ center: e.features[0].geometry.coordinates });
              const coordinates = e.features[0].geometry.coordinates.slice();
              const ps = e.features[0].properties.province_state;
              const cr = e.features[0].properties.country_region;
              const c = e.features[0].properties.confirmed;
              const r = e.features[0].properties.recovered;
              const f = e.features[0].properties.deaths;

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              let popup = document.querySelector(".mapboxgl-popup");

              let newPopup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `<h3>${ps !== "null" ? ps : ""} ${
                    ps !== "null" ? "" : cr
                  }</h3> <span class="divider"></span> <p class="ps-total"><span class="nix">Total Confirmed Cases</span>${c}</p> <span class="divider"></span> <ul><li class="recovered">Recovered: ${r}</li><li class="fatal">Fatal: ${f}</li></ul>`
                );

              if (popup) {
                popup.remove();
                newPopup.addTo(map);
              } else newPopup.addTo(map);

              e.originalEvent.stopPropagation();
            }

            function enterPoint() {
              map.getCanvas().style.cursor = "pointer";
            }

            function leavePoint() {
              map.getCanvas().style.cursor = "";
            }

            map.on("click", "points", clickMap);

            map.on("click", "pointsOver", clickMap);

            map.on("mouseenter", "points", function() {
              enterPoint();
            });

            map.on("mouseleave", "points", function() {
              leavePoint();
            });

            map.on("mouseenter", "pointsOver", function() {
              enterPoint();
            });

            map.on("mouseleave", "pointsOver", function() {
              leavePoint();
            });
          });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, state, state.lat, state.lng, state.zoom]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
