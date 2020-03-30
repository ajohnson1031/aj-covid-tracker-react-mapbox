const initialState = {
  lng: 38,
  lat: -94,
  zoom: 3.75,
  worldTotal: 0,
  worldRecovered: 0,
  colorkey: "red-text",
  highestDeathRate: {
    Province_State: null,
    Country_Region: null,
    RecoveryRate: 0,
    DeathRate: 0,
    Lat: 0,
    Lng: 0,
    Confirmed: 0,
    Deaths: 0,
    Recovered: 0
  },
  highestRecoveredRate: {
    Province_State: null,
    Country_Region: null,
    RecoveryRate: 0,
    DeathRate: 0,
    Lat: 0,
    Lng: 0,
    Confirmed: 0,
    Deaths: 0,
    Recovered: 0
  },
  highestDeathTotal: {
    Province_State: null,
    Country_Region: null,
    DeathTotal: 0,
    Lat: 0,
    Lng: 0,
    Confirmed: 0,
    Recovered: 0,
    Deaths: 0
  },
  highestRecoveredTotal: {
    Province_State: null,
    Country_Region: null,
    RecoveryTotal: 0,
    Lat: 0,
    Lng: 0,
    Confirmed: 0,
    Deaths: 0,
    Recovered: 0
  },
  buttonInfo: {
    text: "[HIDE]",
    styleA: { background: "rgba(25,25,25,0.5)" },
    styleB: { display: "flex" }
  },
  mkey: null,
  mapview: "confirmed",
  location: "New York"
};

export default initialState;
