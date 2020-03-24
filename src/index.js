import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./redux-reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
