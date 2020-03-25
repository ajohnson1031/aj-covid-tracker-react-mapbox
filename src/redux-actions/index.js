export const COUNT_CASES = "COUNT_CASES";
export const HIGHEST_RATES = "HIGHEST_RATES";
export const HIGHEST_DEATHS = "HIGHEST_DEATHS";
export const HIGHEST_RECOVERED = "HIGHEST_RECOVERED";
export const SHOW_HIDE = "SHOW_HIDE";

export const countCases = confirmed => dispatch => {
  dispatch({ type: COUNT_CASES, payload: confirmed });
};

export const highestRates = highest => dispatch => {
  const Province_State = highest[0];
  const Country_Region = highest[1];
  const Confirmed = highest[2];
  const Deaths = highest[3];
  const Recovered = highest[4];

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
      RecoveryRate: Number(RecoveryRate)
    }
  });

  dispatch({
    type: HIGHEST_DEATHS,
    payload: {
      Province_State: Province_State,
      Country_Region: Country_Region,
      DeathTotal: Number(Deaths)
    }
  });

  dispatch({
    type: HIGHEST_RECOVERED,
    payload: {
      Province_State: Province_State,
      Country_Region: Country_Region,
      RecoveryTotal: Number(Recovered)
    }
  });
};

export const showHide = () => dispatch => {
  dispatch({ type: SHOW_HIDE });
};
