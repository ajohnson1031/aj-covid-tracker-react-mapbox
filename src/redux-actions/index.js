export const COUNT_CASES = "COUNT_CASES";

export const countCases = confirmed => dispatch => {
  dispatch({ type: COUNT_CASES, payload: confirmed });
};
