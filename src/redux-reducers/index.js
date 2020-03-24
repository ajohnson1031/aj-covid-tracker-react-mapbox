import initialState from "../redux-stores";
import { COUNT_CASES } from "../redux-actions";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_CASES:
      return { ...state, worldTotal: state.worldTotal + action.payload };
    default:
      return state;
  }
};
