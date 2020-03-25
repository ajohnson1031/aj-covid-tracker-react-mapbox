const initialState = {
  lng: 38,
  lat: -94,
  zoom: 3.75,
  worldTotal: 0,
  highestDeathRate: {
    Province_State: null,
    Country_Region: null,
    RecoveryRate: 0,
    DeathRate: 0
  },
  highestRecoveredRate: {
    Province_State: null,
    Country_Region: null,
    RecoveryRate: 0,
    DeathRate: 0
  },
  highestDeathTotal: {
    Province_State: null,
    Country_Region: null,
    DeathTotal: 0
  },
  highestRecoveredTotal: {
    Province_State: null,
    Country_Region: null,
    RecoveryTotal: 0
  }
};

export default initialState;
