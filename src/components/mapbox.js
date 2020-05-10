import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const styles = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const MapboxGLMap = ({ state }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = state.mkey;

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/ajohnson1031/ck84r3wfc05wa1ipbebi8dh51", // stylesheet location
        center: [state.lat, state.lng],
        zoom: state.zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        let feats = [];

        axios
          .get(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json"
          )
          .then((res) => {
            res.data.features.map((_) => {
              if (_.geometry && _.attributes.Province_State !== "Recovered") {
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
                    deaths: _.attributes.Deaths,
                  },
                  geometry: {
                    coordinates: [_.geometry.x, _.geometry.y],
                    type: "Point",
                  },
                });
              }

              if (_.attributes.Province_State !== "Recovered")
                state.countCases([
                  _.attributes.Confirmed,
                  _.attributes.Recovered,
                ]);

              if (_.attributes.Province_State !== "Recovered")
                state.highestRates([
                  _.attributes.Province_State,
                  _.attributes.Country_Region,
                  _.attributes.Confirmed,
                  _.attributes.Deaths,
                  _.attributes.Recovered,
                  _.attributes.Lat,
                  _.attributes.Long_,
                ]);
            });
          })
          .catch((err) => console.log(err))
          .finally((_) => {
            map.addSource("infected", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: feats,
              },
            });

            map.addLayer({
              id: "points",
              source: "infected",
              type: "circle",
              layout: { visibility: "visible" },
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
                  ["*", 0.00015, ["number", ["get", "confirmed"]]],
                  3,
                  ["*", 0.00015, ["number", ["get", "confirmed"]]],
                  4,
                  ["*", 0.0002, ["number", ["get", "confirmed"]]],
                  5,
                  ["*", 0.0002, ["number", ["get", "confirmed"]]],
                ],
              },
            });

            map.addLayer({
              id: "pointsOver",
              source: "infected",
              type: "circle",
              layout: { visibility: "visible" },
              paint: {
                "circle-color": "#FB6E6E",
                "circle-opacity": 0,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#FB6E6E",
                "circle-stroke-opacity": 0.2,
                "circle-radius": 10,
              },
            });

            map.addLayer({
              id: "rec-points",
              source: "infected",
              type: "circle",
              layout: { visibility: "none" },
              paint: {
                "circle-color": "#00E600",
                "circle-opacity": 0.5,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#00E600",
                "circle-stroke-opacity": 0.8,
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  2,
                  ["*", 0.00015, ["number", ["get", "recovered"]]],
                  3,
                  ["*", 0.00015, ["number", ["get", "recovered"]]],
                  4,
                  ["*", 0.0002, ["number", ["get", "recovered"]]],
                  5,
                  ["*", 0.0002, ["number", ["get", "recovered"]]],
                ],
              },
            });

            map.addLayer({
              id: "rec-pointsOver",
              source: "infected",
              type: "circle",
              layout: { visibility: "none" },
              paint: {
                "circle-color": "#00E600",
                "circle-opacity": 0,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#00E600",
                "circle-stroke-opacity": 0.2,
                "circle-radius": 10,
              },
            });

            const hdc = document.getElementById("hdc");
            const hdr = document.getElementById("hdr");
            const hrc = document.getElementById("hrc");
            const hrr = document.getElementById("hrr");

            [hdc, hdr, hrc, hrr].map((elem) =>
              elem.addEventListener("click", highClick)
            );

            function highClick(e) {
              let highest, coordinates, ps, cr, c, r, f, rr, fr;
              switch (e.currentTarget) {
                case hdc:
                  highest = document.getElementById("hdci").value.split(",");
                  if (highest[7] === "recovered") toggleButton.click();
                  break;
                case hdr:
                  highest = document.getElementById("hdri").value.split(",");
                  if (highest[7] === "recovered") toggleButton.click();
                  break;
                case hrc:
                  highest = document.getElementById("hrci").value.split(",");
                  if (highest[7] === "confirmed") toggleButton.click();
                  break;
                case hrr:
                  highest = document.getElementById("hrri").value.split(",");
                  if (highest[7] === "confirmed") toggleButton.click();
                  break;
                default:
                  break;
              }

              coordinates = [highest[1], highest[0]];
              ps = highest[2];
              cr = highest[3];
              c = highest[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              f = highest[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              r = highest[6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              rr =
                highest[6] === 0 && highest[4] === 0
                  ? 0
                  : highest[6] === highest[4] && f > 0
                  ? Number(
                      ((highest[6] - highest[5]) / highest[4]) * 100
                    ).toFixed(2) + "%"
                  : Number(highest[6] / highest[4]) * 100 === Infinity
                  ? 0
                  : isNaN(Number(highest[6] / highest[4]) * 100)
                  ? 0
                  : Number((highest[6] / highest[4]) * 100).toFixed(2) + "%";

              fr =
                highest[5] === 0 && highest[4] === 0
                  ? 0
                  : Number(highest[5] / highest[4]) * 100 === Infinity
                  ? 0
                  : isNaN(Number(highest[5] / highest[4]) * 100)
                  ? 0
                  : Number((highest[5] / highest[4]) * 100).toFixed(2) + "%";

              map.flyTo({ center: coordinates });

              let popup = document.querySelector(".mapboxgl-popup");

              let newPopup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `<h3 class="popup-header">${ps !== "" ? ps : ""} ${
                    ps !== "" ? "" : cr
                  }</h3> <span class="divider"></span> <p class="ps-total"><span class="nix">Total Confirmed Cases</span>${c}</p> <span class="divider"></span> <ul><li class="recovered">Recovered: ${r} / Rate: ${rr}</li><li class="fatal">Fatal: ${f} / Rate: ${fr}</li></ul>`
                );

              if (popup) {
                popup.remove();
                newPopup.addTo(map);
              } else newPopup.addTo(map);

              state.locationClicked([ps, cr, coordinates]);

              e.stopPropagation();
            }

            function clickMap(e) {
              map.flyTo({ center: e.features[0].geometry.coordinates });
              const coordinates = e.features[0].geometry.coordinates.slice();
              const ps = e.features[0].properties.province_state;
              const cr = e.features[0].properties.country_region;
              const c = e.features[0].properties.confirmed
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const r = e.features[0].properties.recovered
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const f = e.features[0].properties.deaths
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              let rr =
                e.features[0].properties.recovered === 0 &&
                e.features[0].properties.confirmed === 0
                  ? 0
                  : e.features[0].properties.recovered ===
                      e.features[0].properties.confirmed && f > 0
                  ? Number(
                      ((e.features[0].properties.recovered -
                        e.features[0].properties.deaths) /
                        e.features[0].properties.confirmed) *
                        100
                    ).toFixed(2) + "%"
                  : Number(
                      e.features[0].properties.recovered /
                        e.features[0].properties.confirmed
                    ) *
                      100 ===
                    Infinity
                  ? 0
                  : isNaN(
                      Number(
                        e.features[0].properties.recovered /
                          e.features[0].properties.confirmed
                      ) * 100
                    )
                  ? 0
                  : Number(
                      (e.features[0].properties.recovered /
                        e.features[0].properties.confirmed) *
                        100
                    ).toFixed(2) + "%";

              let fr =
                e.features[0].properties.deaths === 0 &&
                e.features[0].properties.confirmed === 0
                  ? 0
                  : Number(
                      e.features[0].properties.deaths /
                        e.features[0].properties.confirmed
                    ) *
                      100 ===
                    Infinity
                  ? 0
                  : isNaN(
                      Number(
                        e.features[0].properties.deaths /
                          e.features[0].properties.confirmed
                      ) * 100
                    )
                  ? 0
                  : Number(
                      (e.features[0].properties.deaths /
                        e.features[0].properties.confirmed) *
                        100
                    ).toFixed(2) + "%";

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
                  }</h3> <span class="divider"></span> <p class="ps-total"><span class="nix">Total Confirmed Cases</span>${c}</p> <span class="divider"></span> <ul><li class="recovered">Recovered: ${r} / Rate: ${rr}</li><li class="fatal">Fatal: ${f} / Rate: ${fr}</li></ul>`
                );

              if (popup) {
                popup.remove();
                newPopup.addTo(map);
              } else newPopup.addTo(map);

              state.locationClicked([ps, cr, coordinates]);

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
            map.on("click", "rec-points", clickMap);
            map.on("click", "rec-pointsOver", clickMap);

            map.on("mouseenter", "points", function () {
              enterPoint();
            });

            map.on("mouseleave", "points", function () {
              leavePoint();
            });

            map.on("mouseenter", "pointsOver", function () {
              enterPoint();
            });

            map.on("mouseleave", "pointsOver", function () {
              leavePoint();
            });

            map.on("mouseenter", "rec-points", function () {
              enterPoint();
            });

            map.on("mouseleave", "rec-points", function () {
              leavePoint();
            });

            map.on("mouseenter", "rec-pointsOver", function () {
              enterPoint();
            });

            map.on("mouseleave", "rec-pointsOver", function () {
              leavePoint();
            });

            const toggleButton = document.getElementById("toggle-id");
            const layerArr = [
              "points",
              "pointsOver",
              "rec-points",
              "rec-pointsOver",
            ];
            toggleButton.addEventListener("click", function () {
              state.changeMapView();

              layerArr.forEach((layer) => {
                let visibility = map.getLayoutProperty(layer, "visibility");

                map.setLayoutProperty(
                  layer,
                  "visibility",
                  visibility === "visible" ? "none" : "visible"
                );
              });
            });
          });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, state.lat, state.lng, state.zoom, state.mapview]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
