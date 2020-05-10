import axios from "axios";

export const COUNT_CASES = "COUNT_CASES";
export const HIGHEST_RATES = "HIGHEST_RATES";
export const HIGHEST_DEATHS = "HIGHEST_DEATHS";
export const HIGHEST_RECOVERED = "HIGHEST_RECOVERED";
export const SHOW_HIDE = "SHOW_HIDE";
export const GET_MAP_KEY = "GET_MAP_KEY";
export const CHANGE_MAPVIEW = "CHANGE_MAPVIEW";
export const LOCATION_CLICKED = "LOCATION_CLICKED";

export const locationClicked = (location) => (dispatch) => {
  dispatch({ type: LOCATION_CLICKED, payload: location });
};

export const countCases = (cases) => (dispatch) => {
  dispatch({ type: COUNT_CASES, payload: cases });
};

export const highestRates = (highest) => (dispatch) => {
  const Province_State = highest[0];
  const Country_Region = highest[1];
  const Confirmed = highest[2];
  const Deaths = highest[3];
  const Recovered = highest[4];
  const Lat = highest[5];
  const Long = highest[6];

  const DeathRate =
    Deaths === 0 && Confirmed === 0
      ? 0
      : Number(Deaths / Confirmed) * 100 === Infinity
      ? 0
      : isNaN(Number(Deaths / Confirmed) * 100)
      ? 0
      : Number((Deaths / Confirmed) * 100).toFixed(2);

  const RecoveryRate =
    Recovered === 0 && Confirmed === 0
      ? 0
      : Recovered === Confirmed && Deaths > 0
      ? Number(((Recovered - Deaths) / Confirmed) * 100).toFixed(2)
      : Number(Recovered / Confirmed) * 100 === Infinity
      ? 0
      : isNaN(Number(Recovered / Confirmed) * 100)
      ? 0
      : Number((Recovered / Confirmed) * 100).toFixed(2);

  dispatch({
    type: HIGHEST_RATES,
    payload: {
      Province_State: Province_State,
      Country_Region: Country_Region,
      DeathRate: Number(DeathRate),
      RecoveryRate: Number(RecoveryRate),
      Lat: Lat,
      Long: Long,
      Confirmed: Number(Confirmed),
      Deaths: Number(Deaths),
      Recovered: Recovered,
    },
  });

  dispatch({
    type: HIGHEST_DEATHS,
    payload: {
      Province_State: Province_State,
      Country_Region: Country_Region,
      DeathTotal: Number(Deaths),
      Lat: Lat,
      Long: Long,
      Confirmed: Number(Confirmed),
      Deaths: Number(Deaths),
      Recovered: Recovered,
    },
  });

  dispatch({
    type: HIGHEST_RECOVERED,
    payload: {
      Province_State: Province_State,
      Country_Region: Country_Region,
      RecoveryTotal: Number(Recovered),
      Lat: Lat,
      Long: Long,
      Confirmed: Number(Confirmed),
      Deaths: Number(Deaths),
      Recovered: Recovered,
    },
  });
};

export const showHide = () => (dispatch) => {
  dispatch({ type: SHOW_HIDE });
};

export const getMapKey = () => (dispatch) => {
  try {
    axios
      .get("https://tranquil-wave-62543.herokuapp.com/keys/mapkey")
      .then((res) => {
        dispatch({ type: GET_MAP_KEY, payload: res.data.key });
      });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const changeMapView = () => (dispatch) => {
  dispatch({ type: CHANGE_MAPVIEW });
};

export const addComma = (str) => {
  return str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
