import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";
import NewsFeed from "./components/newsfeed";

import {
  countCases,
  highestRates,
  showHide,
  getMapKey,
  getNewsKey,
  locationClicked
} from "./redux-actions";

function App(state) {
  useEffect(() => {
    state.getMapKey();
    state.getNewsKey();
  }, []);
  return (
    <div className='App'>
      <div className='map-container'>
        <div
          className='shbutton nixwhite'
          onClick={state.showHide}
          style={state.buttonInfo.styleA}
        >
          <span>{state.buttonInfo.text}</span>

          <a
            class='cb_button'
            href='https://commerce.coinbase.com/checkout/2fbfa5e2-829f-44e8-8830-30734b1050ad'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon name='coffee' />
            &nbsp;Cup 'o Joe?
          </a>
          <script src='https://commerce.coinbase.com/v1/checkout.js?version=201807'></script>
        </div>

        <div id='sidebar-outer' style={state.buttonInfo.styleB}>
          <pre id='sidebar'>
            <div className='sidebar-inner-container'>
              <p className='page-title'>World Corona Virus Map</p>{" "}
              <span className='divider'></span>
              <span className='nixwhite'>Total Confirmed Cases:</span>
              <p className='worldTotal'>
                {state.worldTotal !== 0 ? state.worldTotal : null}
              </p>
              <span className='nixwhite'>[Click A Circle To See Stats]</span>
            </div>

            <div className='sidebar-inner-container light no-column'>
              <p className='stat'>
                Highest Death Count: <br />
                <span className='stat-entry'>
                  {state.highestDeathTotal.Province_State !== null
                    ? `${state.highestDeathTotal.Province_State}, `
                    : `${state.highestDeathTotal.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathTotal.DeathTotal !== 0
                      ? state.highestDeathTotal.DeathTotal
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat'>
                Highest Death Rate: <br />
                <span className='stat-entry'>
                  {state.highestDeathRate.Province_State !== null
                    ? `${state.highestDeathRate.Province_State}, `
                    : `${state.highestDeathRate.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathRate.DeathRate !== 0
                      ? state.highestDeathRate.DeathRate
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat no-margin'>
                Highest Recov. Count: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredTotal.Province_State !== null
                    ? `${state.highestRecoveredTotal.Province_State}, `
                    : `${state.highestRecoveredTotal.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredTotal.RecoveryTotal !== 0
                      ? state.highestRecoveredTotal.RecoveryTotal
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat no-margin'>
                Highest Recov. Rate: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredRate.Province_State !== null
                    ? `${state.highestRecoveredRate.Province_State}, `
                    : `${state.highestRecoveredRate.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredRate.RecoveryRate !== 0
                      ? state.highestRecoveredRate.RecoveryRate
                      : null}
                  </span>
                </span>
              </p>
            </div>

            {state.location && (
              <div className='news-inner-container'>
                <span className='nixwhite stories'>
                  <strong>Related News Stories from {state.location}</strong>:
                  <br />
                  <a
                    className='attribution'
                    href='https://newsapi.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    powered by NewsAPI.org
                  </a>
                </span>
                <div className='article-container light'>
                  <NewsFeed state={state} />
                </div>
              </div>
            )}
          </pre>
        </div>
        {state.mkey && <MapboxGLMap id='map' state={state} />}
      </div>
    </div>
  );
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  countCases,
  highestRates,
  showHide,
  getMapKey,
  getNewsKey,
  locationClicked
})(App);
