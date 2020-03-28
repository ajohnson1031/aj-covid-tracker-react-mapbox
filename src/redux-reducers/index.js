import initialState from "../redux-stores";
import {
  COUNT_CASES,
  HIGHEST_RATES,
  HIGHEST_DEATHS,
  HIGHEST_RECOVERED,
  SHOW_HIDE,
  GET_MAP_KEY,
  GET_NEWS_KEY,
  GET_COINBASE_ID,
  LOCATION_CLICKED,
  CHANGE_MAPVIEW
} from "../redux-actions";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_CASES:
      return {
        ...state,
        worldTotal: state.worldTotal + action.payload[0],
        worldRecovered: state.worldRecovered + action.payload[1]
      };

    case HIGHEST_RATES:
      return {
        ...state,
        highestDeathRate:
          action.payload.DeathRate > state.highestDeathRate.DeathRate
            ? action.payload
            : state.highestDeathRate,
        highestRecoveredRate:
          action.payload.RecoveryRate > state.highestRecoveredRate.RecoveryRate
            ? action.payload
            : state.highestRecoveredRate
      };

    case HIGHEST_DEATHS:
      return {
        ...state,
        highestDeathTotal:
          action.payload.DeathTotal > state.highestDeathTotal.DeathTotal
            ? action.payload
            : state.highestDeathTotal
      };

    case HIGHEST_RECOVERED:
      return {
        ...state,
        highestRecoveredTotal:
          action.payload.RecoveryTotal >
          state.highestRecoveredTotal.RecoveryTotal
            ? action.payload
            : state.highestRecoveredTotal
      };

    case SHOW_HIDE:
      console.log("hello");
      return {
        ...state,
        buttonInfo:
          state.buttonInfo.text === "[HIDE]"
            ? {
                text: "[SHOW DASH]",
                styleA: { background: "none" },
                styleB: { display: "none" }
              }
            : {
                text: "[HIDE]",
                styleA: { background: "rgba(61, 61, 61, 0.5)" },
                styleB: { display: "flex" }
              }
      };
    case GET_MAP_KEY:
      return { ...state, mkey: action.payload };
    case GET_NEWS_KEY:
      return { ...state, nkey: action.payload };
    case GET_COINBASE_ID:
      return { ...state, cbkey: action.payload };
    case CHANGE_MAPVIEW: {
      return {
        ...state,
        mapview: state.mapview === "confirmed" ? "recovered" : "confirmed",
        colorkey: state.colorkey === "red-text" ? "green-text" : "red-text"
      };
    }
    case LOCATION_CLICKED:
      return {
        ...state,
        location:
          action.payload[0] !== "" || action.payload[0] === "null"
            ? action.payload[0]
            : action.payload[1],
        lat: action.payload[2][0],
        lng: action.payload[2][1]
      };
    default:
      return state;
  }
};
