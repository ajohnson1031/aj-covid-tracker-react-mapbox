import initialState from "../redux-stores";
import {
  COUNT_CASES,
  HIGHEST_RATES,
  HIGHEST_DEATHS,
  HIGHEST_RECOVERED,
  SHOW_HIDE
} from "../redux-actions";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_CASES:
      return { ...state, worldTotal: state.worldTotal + action.payload };

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
                text: "[SHOW STATS]",
                styleA: { background: "none" },
                styleB: { display: "none" }
              }
            : {
                text: "[HIDE]",
                styleA: { background: "rgba(61, 61, 61, 0.5)" },
                styleB: { display: "flex" }
              }
      };
    default:
      return state;
  }
};
